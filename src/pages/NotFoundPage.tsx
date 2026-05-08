import { Link } from "react-router-dom";
import SectionHeader from "../components/SectionHeader";

export default function NotFoundPage() {
  return (
    <div className="px-4 py-6 md:px-6">
      <SectionHeader title="404" subtitle="This page doesn’t exist (mock router)." />
      <div className="mt-4">
        <Link to="/" className="text-neon-cyan hover:underline">
          Go home
        </Link>
      </div>
    </div>
  );
}

