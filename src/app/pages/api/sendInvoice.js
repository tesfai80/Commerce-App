export default function handler(req, res) {
    if (req.method === 'POST') {
      const { total } = req.body;
      // Implement email sending logic here
  
      res.status(200).json({ message: 'Invoice sent successfully' });
    } else {
      res.status(405).end(); // Method Not Allowed
    }
  }
  