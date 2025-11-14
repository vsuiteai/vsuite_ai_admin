import type { type Timestamp } from "firebase-admin/firestore";
import type { activity, resources, resource_meta } from "./types/activities";

declare global {
  type ConsultantDetail = {
    consultant_id?: string;
    consultant_first_name: string;
    consultant_last_name: string;

    consultant_role: string;

    consultant_home_address: string;
    consultant_email: string;
    consultant_password: string;
    consultant_created_at?: string;
    is_active?: boolean;
    last_activity?: AnActivityLogEntry;

    Clients?: {
      client_id: string;
      client_uid: string;
      client_contact_fullname: string;
      client_contact_work_email: string;
      client_company_name: string;
      client_contact_role: string;
      onboarding_process_status: string;
    }[];
  };

  type AdminDetail = {
    admin_id?: string;
    admin_username: string;
    admin_firstname: string;
    admin_lastname: string;
    admin_password: string;
    admin_created_at?: string;
    admin_updated_at?: string;
  };

  type onboarding_process_status = "not_started" | "started" | "completed";

  type file_to_be_uploaded = File | null;

  type ClientDetail = {
    client_id?: string;
    client_uid?: string;
    client_company_name: string;
    client_contact_fullname: string;
    client_contact_phone: string;
    client_contact_work_email: string;
    client_contact_role: string;
    client_is_verified: boolean;
    client_created_at?: string;
    client_updated_at?: string;
    client_password?: string;
    onboarding_process_status: onboarding_process_status;
    client_industry?: string;

    status?: boolean;
    last_activity?: AnActivityLogEntry;

    consultants?: {
      consultant_id: string;
      consultant_first_name: string;
      consultant_last_name: string;
      consultant_email: string;
      consultant_role: string;
    }[];
  };

  type Pagination = {
    currentPage: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
    showing: string;
    hasNext: boolean;
    hasPrev: boolean;
    pages: number[];
  };

  type AClientVerificationRow = {
    cl_ver_id: string;
    cl_ver_verification_token: string;
    cl_ver_client_id: string;
    cl_ver_is_verified: boolean;
    cl_ver_token_expires_at: string;
    cl_ver_created_at: string;
  };

  type EmailTypes = "insufficient_files";

  type AnActivityLogEntry = {
    actor: object;
    action: string;
    element_acted_upon: object;
    date: Timestamp;
  };

  type ClientUploadedFile = {
    file_id?: string;
    file_type: fileType;
    file_original_name: string;
    file_GCS_name: string;
    file_GCS_id: string;
    file_metric_contained: string;
    file_owner: string; // client_id
    created_at?: string;
    updated_at?: string;
    owner?: {
      client_id: number;
      client_uid: string;
      client_company_name: string;
    };
  };

  type FileMetadata = {
    name: string;
    publicUrl: string;
    contentType: string;
    size: string;
    created_at: string; // ISO date string
  };

  type QueryProcessStatus = "processing" | "completed" | "failed";

  type Query = {
    id: string;
    created_at: Timestamp;
    status: QueryProcessStatus;
    client: ClientDetail;
    query_id: string;
    financial_client_files: ClientUploadedFile[];
    operational_client_files: ClientUploadedFile[];
    sales_client_files: ClientUploadedFile[];
    StartupBrainAnalysis?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };
    OnboardingQuestionnaireAnalysis?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };
    BSANarrativeBuilder?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };
    BSAFinancialRiskScoringEngine?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };
    BSAFinancialMetricAnalysis?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };
    StrategicDiagnosticAndCompetitiveLandscape?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };
    NirvanaNavigationScenarioArchitect?: {
      prompt_result: string;
      created_at: Timestamp;
      files_used_ai_agent: Query_file[];
      files_used_client_files: ClientUploadedFile[];
    };

    formattedDate: string;
    formattedTime: string;
  } | null;

  type client_form_types =
    | "client_onboarding_form"
    | "asset_upload_form"
    | "advisior_onboarding_form";

  type question_answer = {
    question: string;
    answer: string;
    for_ai_multiple_choice_analysis?: boolean;
    options?: {
      e: string;
      d: string;
      c: string;
      b: string;
      a: string;
    };
  };

  type QuestionaireEntry = {
    id: string;
    client_uid: string;
    answers: question_answer[];
    form_type: client_form_types;
    created_at: Timestamp;
    formattedDate: string;
  };

  type ai_agentType = "open_ai" | "gemini";

  type promp_request_body = {
    client_id: string;
    ai_agent: ai_agentType;
    files: ClientUploadedFile[];
    execution_type: string;
  };

  type FileAnalytsis = {
    total_files: number;
    sales_files: number;
    operations_files: number;
    financial_files: number;
  };

  type prompt_stats_status = "Failed" | "Ongoing" | "Successful";

  type prompt_stats = {
    prompt_stats_id?: string;
    prompt_stats_status: prompt_stats_status;
    prompt_stats_count: number;
  };
}
