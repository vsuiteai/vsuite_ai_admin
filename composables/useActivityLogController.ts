// import axios from "axios";

import type { activity } from "~/types/activities";

type ActivityFormatted = {
  message: string;
};

export const useActivityLogController = () => {
  const parse_date = (anActivity: AnActivityLogEntry | null) => {
    const raw_date = anActivity?.date ?? false;

    if (!raw_date) {
      return "---";
    }

    const date = raw_date.toDate();

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
    const year = date.getFullYear();

    const formatted = `${day}-${month}-${year}`;

    return formatted;
  };

  const formatActivity = (act: activity): ActivityFormatted => {
    const actorName = act.actor.resource_name;

    const targetName = act.target.resource_name;

    const gen_link = (text: string, link: string = "#") => {
      return `<a class=" text-[#BE185D]" href="${link}" >${text}<a>`;
    };

    switch (act.action) {
      case "initiated_a_strategy_run":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${gen_link(
            actorName
          )} initiated a strategy(${act.target.resource_id}) run</p>`,
        };

      case "strategy_run_failed":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">Strategy(${act.target.resource_id}) run initiated by ${actorName} failed </p>`,
        };

      case "strategy_run_succeeded":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">Strategy(${act.target.resource_id}) run initiated by ${actorName} succeeded </p>`,
        };

      case "verified_primary_contact_email":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${actorName} ${act.actor.resource_id} verified the primary contact email </p>`,
        };

      case "submitted_ceo_onboarding":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${actorName} ${act.actor.resource_id} submitted CEO onboarding </p>`,
        };

      case "submitted_advisior_onboarding":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${actorName} ${act.actor.resource_id} submitted Advisor onboarding </p>`,
        };

      case "uploaded_a_file":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${actorName} ${act.actor.resource_id} uploaded a file "${targetName}" ${act.target.resource_id}</p>`,
        };

      case "assigned_consultant_to_client":
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${actorName} assigned consultant ${targetName} to client ${
            act.key_variables__client_involved?.client_name ?? ""
          } </p>`,
        };

      default:
        return {
          message: `<p class="text-[14px]/[18px] text-[#1A1A1D]">${actorName} performed ${act.action} </p>`,
        };
    }
  };

  const get_activities = async () => {
    if (!process.client) return;
    try {
      const axios = (await import("axios")).default;
      const response = await axios.get(`/api/activities`);

      // console.log(response);

      const activities = (response.data?.data?.activities as any) ?? [];
      const startAfter = (response.data?.data?.startAfter as any) ?? null;
      const endBefore = (response.data?.data?.endBefore as any) ?? null;
      return { activities: activities as activity[], startAfter, endBefore };
    } catch (error: any) {
      const message =
        error?.response?.data?.message || // API-sent error
        error?.message || // Network error, etc.
        "An unknown error occurred";

      throw new Error(message);
    }
  };

  return {
    parse_date,
    formatActivity,
    get_activities,
  };
};
