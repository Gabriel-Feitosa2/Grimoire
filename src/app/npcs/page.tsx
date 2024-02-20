import { getServerSession } from "next-auth";
import NpcList from "~/components/pages/npcList";

import { authOptions } from "~/server/auth";
import { api } from "~/trpc/server";

export default async function Npcs() {
  const session = await getServerSession(authOptions);
  const npcs = await api.npc.all.query();

  return (
    <div className="p-4 text-white">
      <NpcList npcs={npcs} />
    </div>
  );
}
