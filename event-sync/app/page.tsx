import { API_BASE_URL } from "@/lib/config";

export default async function Home() {
  const res = await fetch(`${API_BASE_URL}/api/ping`);
  const data = await res.json();

  const event = await fetch(`${API_BASE_URL}/api/event`);
  const events = await event.json();
  return (
    <>
      <div>{data.message}</div>
      {events.map((e: any) => {        
        return (
          <div key={e.id}>
          <div>{e.id}</div>
          <div>{e.title}</div>
          <div>{e.slug}</div>
          <div>{e.description}</div>
          <div>{e.startDate}</div>
          <div>{e.endDate}</div>
          <div>{e.endDate}</div>
          <div>{e.location}</div>
          </div>
        )
      })}
    </>
  );
}
