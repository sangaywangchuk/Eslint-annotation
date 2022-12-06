import inputs from './inputs';
import * as core from '@actions/core';
const { sha, ownership, checkName } = inputs;
import { GitHub } from '@actions/github/lib/utils';
import { ChecksUpdateParamsOutputAnnotations } from './types';
/**
 * Create a new GitHub check run
 * @param options octokit.checks.create parameters
 */

const formatDate = (): string => {
  return new Date().toISOString();
};

export const createStatusCheck = async (octokit: InstanceType<typeof GitHub>): Promise<number> => {
  const { data } = await octokit.rest.checks.create({
    ...ownership,
    started_at: formatDate(),
    head_sha: sha,
    status: 'in_progress',
    name: checkName,
    mediaType: {
      previews: ['antiope'],
    },
  });
  return data.id;
};

/**
 * Add annotations to an existing GitHub check run
 * @param annotations an array of annotation objects. See https://developer.github.com/v3/checks/runs/#annotations-object-1
 * @param checkId the ID of the check run to add annotations to
 */
export const updateCheckRun = async (
  octokit: InstanceType<typeof GitHub>,
  checkId: number,
  annotations: ChecksUpdateParamsOutputAnnotations[]
): Promise<void> => {
  /**
   * Update the GitHub check with the
   * annotations from the report analysis.
   *
   * If there are more than 50 annotations
   * we need to make multiple API requests
   * to avoid rate limiting errors
   *
   * See https://developer.github.com/v3/checks/runs/#output-object-1
   */
  const numberOfAnnotations = annotations.length;
  const batchSize = 50;
  const numBatches = Math.ceil(numberOfAnnotations / batchSize);
  const checkUpdatePromises = [];
  for (let batch = 1; batch <= numBatches; batch++) {
    const batchMessage = `Found ${numberOfAnnotations} ESLint errors and warnings, processing batch ${batch} of ${numBatches}...`;
    console.log(batchMessage);
    const annotationBatch = annotations.splice(0, batchSize);
    try {
      await octokit.rest.checks.update({
        ...ownership,
        check_run_id: checkId,
        head_sha: sha,
        name: checkName,
        status: 'in_progress',
        output: {
          title: checkName,
          summary: batchMessage,
          annotations: annotationBatch,
        },
        /**
         * The check run API is still in beta and the developer preview must be opted into
         * See https://developer.github.com/changes/2018-05-07-new-checks-api-public-beta/
         */
        mediaType: {
          previews: ['antiope'],
        },
      });
      console.log('batch: ', batch);
    } catch (err) {
      const error = err as Error;
      core.debug(error.toString());
      core.setFailed(error.message + 'Annotation updated failed');
    }
  }
};

export const closeStatusCheck = async (
  octokit: InstanceType<typeof GitHub>,
  conclusion: string,
  checkId: number,
  summary: string
): Promise<void> => {
  try {
    // https://developer.github.com/v3/checks/runs/#create-a-check-run
    // https://octokit.github.io/rest.js/v16#checks-create
    const { data } = await octokit.rest.checks.create({
      ...ownership,
      conclusion,
      head_sha: sha,
      name: checkName,
      completed_at: formatDate(),
      status: 'completed',
      check_run_id: checkId,
      output: {
        title: checkName,
        summary: summary,
      },
    });
  } catch (err) {
    const error = err as Error;
    core.debug(error.toString());
    core.setFailed(error.message + 'Annotation updated failed');
  }
};