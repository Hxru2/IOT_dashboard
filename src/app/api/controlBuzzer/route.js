// pages/api/controlBuzzer.js
export default function handler(req, res) {
    if (req.method === 'POST') {
      // Add your logic to control the Buzzer here
      // Example: Send a signal to the microcontroller or Raspberry Pi
  
      console.log("Buzzer control request received");
  
      // Simulate success response
      res.status(200).json({ message: 'Buzzer controlled successfully' });
    } else {
      // Handle any other HTTP method
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  }
  