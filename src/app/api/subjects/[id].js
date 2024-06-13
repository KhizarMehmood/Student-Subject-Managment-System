// pages/api/subjects/[id].js
import connectDB from '../../../utils/connectDB';
import Subject from '../../../models/subject';

connectDB();

export default async function handler(req, res) {
  const { method, query: { id } } = req;

  switch (method) {
    case 'PUT':
      try {
        const subject = await Subject.findByIdAndUpdate(id, req.body, { new: true });
        if (!subject) {
          return res.status(404).json({ error: 'Subject not found' });
        }
        res.status(200).json(subject);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    case 'DELETE':
      try {
        const subject = await Subject.findByIdAndDelete(id);
        if (!subject) {
          return res.status(404).json({ error: 'Subject not found' });
        }
        res.status(200).json({ message: 'Subject deleted' });
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
      break;
    default:
      res.setHeader('Allow', ['PUT', 'DELETE']);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
