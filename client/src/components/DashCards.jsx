function DashCards({title, count, desc}) {
  return (
    <div>
      <div className="stats shadow bg-white text-black w-72 h-52 shadow-md p-2 rounded-xl items-center justify-center">
        <div className="stat">
          <div className="stat-title">{title}</div>
          <div className="stat-value">{count}</div>
          <div className="stat-desc">{desc}</div>
        </div>
      </div>
    </div>
  );
}

export default DashCards;
