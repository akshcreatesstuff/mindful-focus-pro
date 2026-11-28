import { useAppSelector } from "../../app/hooks";
import { useDataServices } from "../../app/useDataServices";
import JournalView from "../../features/journal/components/JournalView";

export default function Journal() {
  const user = useAppSelector((state) => state.auth.user);
  const services = useDataServices();

  if (!user || !services) return null;

  return (
    <JournalView
      key={user.uid}
      uid={user.uid}
      repository={services.journal}
      analyst={services.analyst}
    />
  );
}
