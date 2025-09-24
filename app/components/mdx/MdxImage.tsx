import Image from "next/image";

export function MdxImage(props: any) {
  return (
    <div className="my-6 flex justify-center w-full">
      <Image
        {...props}
        className="rounded-xl shadow-md w-full"
        alt={props.alt}
      />
    </div>
  );
}
