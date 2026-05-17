import { Request, Response } from "express";
import Lead from "../models/Lead";

export const addLeadController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const lead =
        await Lead.create(
          req.body
        );

      res.status(201).json(
        lead
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Error adding lead",
      });
    }
  };

export const getLeadsController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const leads =
        await Lead.find();

      res.status(200).json(
        leads
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Error fetching leads",
      });
    }
  };

export const updateLeadController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } =
        req.params;

      const updatedLead =
        await Lead.findByIdAndUpdate(
          id,
          req.body,
          {
            new: true,
          }
        );

      res.status(200).json(
        updatedLead
      );
    } catch (error) {
      res.status(500).json({
        message:
          "Error updating lead",
      });
    }
  };

export const deleteLeadController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { id } =
        req.params;

      await Lead.findByIdAndDelete(
        id
      );

      res.status(200).json({
        message:
          "Lead deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          "Error deleting lead",
      });
    }
  };