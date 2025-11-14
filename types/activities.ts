type resources =
  | "strategy"
  | "client"
  | "questionaire"
  | "file"
  | "consultant"
  | "admin"
  | "system";

type actions =
  | "initiated_a_strategy_run"
  | "strategy_run_failed"
  | "strategy_run_succeeded"
  | "verified_primary_contact_email" // Done
  | "submitted_ceo_onboarding" // Done
  | "submitted_advisior_onboarding" // Done
  | "uploaded_a_file" // Done
  | "assigned_consultant_to_client";

type resource_meta = {
  resource_id: string;
  resource_name: string;
  resouce_type: resources;
};

type activity = {
  key_variables__client_involved: {
    client_id: string;
    client_name: string;
  } | null;
  actor: resource_meta;
  action: actions;
  target: resource_meta;
  timestamp: string;
  created_at?: string;
  formattedDate?: string;
  formattedTime?: string;
};

type strategy_initiator_resource_meta = {
  resource_id: string;
  resource_name: string;
  resouce_type: "consultant" | "admin" | "system";
};

export {
  type actions,
  type resources,
  type resource_meta,
  type activity,
  type strategy_initiator_resource_meta,
};
