import ProviderGraph from "@/components/modules/graph/ProviderGraph";

export default function UserDashboard() {
    return (
      <div>
        <div className="min-h-[100vh] rounded-xl bg-muted mt-4">
          <ProviderGraph></ProviderGraph>
        </div>
      </div>
    );
  }