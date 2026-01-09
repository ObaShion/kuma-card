type CardProps = {
  region: string;
  status: string;
  bg: string;
  imageUrl: string | null;
  features: string[];
  removeFeature: (i: number) => void;
};

export default function PokemonCardForestTemplate({
  region,
  status,
  bg,
  imageUrl,
  features,
  removeFeature,
}: CardProps) {
  const statusClass =
    status === "安全"
      ? "status-safe"
      : status === "注意"
        ? "status-warn"
        : status === "危険"
          ? "status-danger"
          : "";

  return (
    <div
      id="bear-card"
      className="w-[350px] h-[520px] rounded-2xl shadow-xl border-4 border-green-700 relative overflow-hidden"
    >
      {/* 背景 */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url('${bg}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* 上部 */}
      <div
        className={`relative z-10 flex justify-between items-center p-4 text-xl font-bold ${statusClass}`}
      >
        <span>{region}</span>
        <span>{status}</span>
      </div>

      {/* 画像またはクリックで3D */}
      <div className="relative z-10 w-[85%] h-[35%] mx-auto rounded-xl overflow-hidden border-2 border-yellow-300 shadow-md">
        {imageUrl ? (
          <img src={imageUrl} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-700"></div>
        )}
      </div>

      {/* 特徴 */}
      <div className="relative z-10 mt-4 px-4 text-white space-y-1">
        <p className="text-lg font-bold"></p>
        <ul className="list-disc list-inside space-y-1">
          {features.map((item, i) => (
            <li key={i} className="flex justify-between">
              {item}
              <button
                className="text-red-400 font-bold"
                onClick={() => removeFeature(i)}
              >
                ✖
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="absolute bottom-0 w-full text-center p-2 text-xs text-white footer-white bg-black/60">
        熊出没危険度カード - 秋田県
      </div>
    </div>
  );
}
