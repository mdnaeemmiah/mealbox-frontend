import CustomerGraph from "@/components/modules/graph/CustomerGraph";

export const dynamic = "force-dynamic";


export default function UserDashboard() {

    return (
      <div>
        <div className="min-h-[100vh] rounded-xl bg-muted mt-4">
          <CustomerGraph></CustomerGraph>
        </div>
      </div>
    );
  }

