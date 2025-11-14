import { get_client_by_uuid } from "~/server/controller/clientCont";
import { initiate_query_process } from "~/server/controller/queryCont";
import { type strategy_initiator_resource_meta } from "../../../../types/activities";

export default defineEventHandler(async (event) => {
  try {
    const session = await requireUserSession(event);

    console.log(session.user);

    const user_id = session.user.id;
    const user_email = session.user.email;
    const user_name = session.user.name;
    const user_category = session.user.category;

    const initiator: strategy_initiator_resource_meta = {
      resource_id: user_id,
      resource_name: user_name,
      resouce_type: user_category,
    };

    const uid = getRouterParam(event, "uid") ?? false;
    const body = await readBody(event);

    const client_files = (body.client_files ?? null) as
      | ClientUploadedFile[]
      | null;
    const ai_agent = (body.ai_agent ?? null) as ai_agentType | null;

    console.log(ai_agent);

    if (!uid) throw new Error("client uid not provided");

    if (client_files === null) {
      throw new Error("no file");
    }

    if (ai_agent === null) {
      throw new Error("ai agent not specified");
    }

    const client = await get_client_by_uuid(uid);

    if (!client) throw new Error("could not get client");
    if (
      typeof client.client_id === "undefined" ||
      (client?.client_id ?? "") == ""
    )
      throw new Error("could not get client");

    const query_id = await initiate_query_process(
      client.client_id,
      client_files,
      ai_agent,
      initiator
    );

    if (typeof query_id === "undefined")
      throw new Error("could not initiate query");

    return {
      error: false,
      message: query_id,
    };
  } catch (err) {
    console.log(err instanceof Error ? err.message : String(err));
    return {
      error: true,
      message: err instanceof Error ? err.message : String(err),
    };
  }
});
