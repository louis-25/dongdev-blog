import Image from "next/image";

export function MdxImage(props: any) {
  return (
    <div className="my-6 flex justify-center">
      <Image {...props} className="rounded-xl shadow-md" alt={props.alt} />
    </div>
  );
}
