import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact API endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate request body
      const validatedData = insertContactSchema.safeParse(req.body);
      
      if (!validatedData.success) {
        return res.status(400).json({
          message: "Invalid form data",
          errors: validatedData.error.errors
        });
      }
      
      // Add timestamp to the contact data
      const contactData = {
        ...validatedData.data,
        createdAt: new Date().toISOString()
      };
      
      // Store contact data
      const contact = await storage.createContact(contactData);
      
      // Return success response
      return res.status(200).json({
        message: "Message sent successfully",
        contact
      });
    } catch (error) {
      console.error("Error saving contact:", error);
      return res.status(500).json({
        message: "Failed to send message. Please try again."
      });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
