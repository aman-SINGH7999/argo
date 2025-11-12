// app/components/Card.js
export default function Card({ icon, title, value, bgColor = "bg-white", iconColor = "bg-gray-600" }) {
  return (
    <div className={`${bgColor} p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4`}>
      <div className={`p-3 rounded-full ${iconColor}`}>
        {icon}
      </div>
      <div>
        <div className="text-2xl font-bold">{value}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </div>
  );
}