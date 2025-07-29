import type { Express } from "express";
import { createServer, type Server } from "http";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve resume download
  app.get('/api/resume', (req, res) => {
    const resumePath = path.join(process.cwd(), 'attached_assets', 'resume (1)_1750923570907.pdf');
    
    res.setHeader('Content-Disposition', 'attachment; filename="Rishabh_Tiwari_Resume.pdf"');
    res.setHeader('Content-Type', 'application/pdf');
    
    // Send the actual resume file
    res.sendFile(resumePath, (err) => {
      if (err) {
        console.error('Error serving resume:', err);
        res.status(404).json({ error: 'Resume not found' });
      }
    });
  });

  // Contact form submission endpoint
  app.post('/api/contact', (req, res) => {
    const { name, email, subject, message } = req.body;
    
    // In a real implementation, this would:
    // 1. Validate the input data
    // 2. Send an email notification
    // 3. Store the message in a database
    // 4. Send a confirmation email to the sender
    
    console.log('Contact form submission:', { name, email, subject, message });
    
    res.json({ 
      success: true, 
      message: "Message received successfully!" 
    });
  });

  const httpServer = createServer(app);
  return httpServer;
}
