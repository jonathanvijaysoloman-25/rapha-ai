function SectionTitle({ title, subtitle }) {
  return (
    <div className="mb-10">

      <h2 className="text-4xl font-bold text-white">
        {title}
      </h2>

      {subtitle && (
        <p className="text-gray-400 mt-2">
          {subtitle}
        </p>
      )}

    </div>
  );
}

export default SectionTitle;