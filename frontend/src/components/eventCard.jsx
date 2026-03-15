const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
      {/* Image */}
      <div className="h-48 w-full overflow-hidden">
        <img
          src={event?.imageUrl || null}
          alt={event?.title}
          className="w-full h-full object-cover hover:scale-110 transition duration-500"
        />
      </div>

      {/* Content */}
      <div className="p-5 space-y-3">
        {/* Date + Location */}
        <div className="flex justify-between text-sm text-gray-500">
          <span>{event?.date}</span>
          <span className="font-medium">{event?.location}</span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-semibold text-gray-800">{event?.title}</h3>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {event?.description}
        </p>
      </div>
    </div>
  );
};

export default EventCard;
