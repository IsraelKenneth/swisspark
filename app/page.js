import Map from "@/components/map/Map"
import Mapping from "@/components/map"

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center pt-5 ">
    <h3 className="font-bold pb-2"> Private Parking Connect</h3>
      <div className=" items-center justify-center">
        <Mapping />
      </div>
    </main>
  )
}
