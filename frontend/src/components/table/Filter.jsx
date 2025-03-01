// eslint-disable-next-line react/prop-types
const Filters = ({ columnFilters, setColumnFilters }) => {
  // eslint-disable-next-line react/prop-types
  const taskName = columnFilters.find((f) => f.id === "task")?.value || "";

  const onFilterChange = (id, value) =>
    setColumnFilters((prev) =>
      prev
        .filter((f) => f.id !== id)
        .concat({
          id,
          value,
        })
    );

  return (
    <div>
      <input
        type="text"
        placeholder="Task name"
        value={taskName}
        onChange={(e) => onFilterChange("task", e.target.value)}
      />
    </div>
  );
};
export default Filters;
