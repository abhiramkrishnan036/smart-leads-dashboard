import Lead from "../models/Lead";

export const createLead =
  async (
    data: {
      name: string;
      email: string;
      company: string;
      status: string;
    }
  ) => {
    const lead =
      await Lead.create(
        data
      );

    return lead;
  };

export const getLeads =
  async () => {
    const leads =
      await Lead.find();

    return leads;
  };