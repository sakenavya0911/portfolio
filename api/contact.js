module.exports = (req, res) => {
    if (req.method === 'POST') {
        const { name, email, mobile, subject, message } = req.body;

        // Basic validation
        if (!name || !email || !message) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        // In a real application, you would send an email here using a service like SendGrid or Nodemailer.
        // For this portfolio, we'll simulate a successful submission.

        console.log('Received contact form submission:', { name, email, mobile, subject, message });

        return res.status(200).json({ success: true, message: 'Message sent successfully!' });
    } else {
        res.setHeader('Allow', ['POST']);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }
};
