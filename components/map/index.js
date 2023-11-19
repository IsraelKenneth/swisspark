import dynamic from "next/dynamic"

const Mapping = dynamic(() => import("./Mapnew"), {
    ssr: false
});

export default Mapping