// pages/api/controlRGB.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Add your logic to control the RGB lights here
      // Example: Send a signal to the microcontroller or Raspberry Pi
  
      console.log("RGB control request received");
  
      // Simulate success response
      res.status(200).json({ message: 'RGB controlled successfully' });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  