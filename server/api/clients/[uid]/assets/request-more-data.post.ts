import { Metrics } from "~/config/forms";
import {
  email_client_by_uuid,
  get_client_by_uuid,
} from "~/server/controller/clientCont";
import { get_client_files_by_uuid } from "~/server/controller/clientFilesCont";

export default defineEventHandler(async (event) => {
  try {
    const uid = getRouterParam(event, "uid") ?? false;

    if (!uid) throw new Error("client uid not provided");

    const client = await get_client_by_uuid(uid);
    const client_uid = client?.client_uid;

    if (!client_uid) throw new Error("client not found");

    /**
     * Right now none of the prompts require sales or operational data,
     * so the prompts need to fire off once the financial metrics and
     * both on boarding forms are completed.
     */

    // const file_metrics_needed = new Set(Object.values(Metrics));
    const file_metrics_needed = new Set([Metrics.financial]);

    const main_files = ((await get_client_files_by_uuid(client_uid)) ??
      ([] as ClientUploadedFile[])) as ClientUploadedFile[];

    for (const file of main_files) {
      for (const metric of file_metrics_needed) {
        if (file.file_metric_contained.includes(metric)) {
          file_metrics_needed.delete(metric); // more efficient than splice
        }
      }
    }

    // console.log(file_metrics_needed);

    if (file_metrics_needed.size > 0) {
      const metricsListHtml = Array.from(file_metrics_needed)
        .map((metric) => `<li>${metric}</li>`)
        .join("");

      const metricsHtmlString = `<ul>${metricsListHtml}</ul>`;

      await email_client_by_uuid(
        client_uid,
        "insufficient_files",
        metricsHtmlString
      );

      return {
        error: false,
        data: null,
        message: "Message sent successfully",
      };
    }
  } catch (err) {
    console.error(err);

    if (err instanceof Error) {
      return {
        error: true,
        data: null,
        message: err.message,
      };
    } else {
      return {
        error: true,
        data: null,
        message: String(err),
      };
    }
  }
});
