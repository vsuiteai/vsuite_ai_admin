import { PromptStats, sequelize } from "~/server/models/index";

const getPromptStats = async () => {
  try {
    return await PromptStats.findAll({
      attributes: [
        "prompt_stats_status",
        [
          sequelize.fn("COUNT", sequelize.col("prompt_stats_status")),
          "prompt_stats_count",
        ],
      ],
      group: ["prompt_stats_status"],
    });
  } catch (error) {
    throw error;
  }
};

export { getPromptStats };
