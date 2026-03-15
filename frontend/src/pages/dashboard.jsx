import { useState, useEffect } from "react";
import { getData, postData } from "../utils/api";
import { useNavigate } from "react-router";

export default function Dashboard() {
  const [formData, setFormData] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const load = async () => {
      const resp = await getData();
      setFormData(resp);
    };

    load();
  }, []);

  if (!formData) return <p>Loading...</p>;

  const handleChange = (section, field, value) => {
    setFormData({
      ...formData,
      [section]: {
        ...formData[section],
        [field]: value,
      },
    });
  };

  const handleRootChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const handleEventChange = (index, field, value) => {
    const updatedEvents = [...formData.events];
    updatedEvents[index][field] = value;

    setFormData({
      ...formData,
      events: updatedEvents,
    });
  };

  const addEvent = () => {
    setFormData({
      ...formData,
      events: [
        ...formData.events,
        {
          date: "",
          title: "",
          description: "",
          location: "",
          imageUrl: "",
        },
      ],
    });
  };

  const handleSubmit = async () => {
    await postData(formData);
    alert("Homepage Updated");
    navigate("/");
  };

  return (
    <div className="p-10 max-w-4xl mx-auto flex flex-col gap-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Navbar */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Navbar</h2>

        <input
          placeholder="Navbar Title"
          value={formData.navbar.title}
          onChange={(e) => handleChange("navbar", "title", e.target.value)}
          className="border p-2 w-full mb-2 rounded-lg"
        />

        <input
          placeholder="Navbar Background Color"
          value={formData.navbar.bgclr}
          onChange={(e) => handleChange("navbar", "bgclr", e.target.value)}
          className="border p-2 w-full rounded-lg"
        />

        {/* <div className="flex-wrap gap-2 mt-3 border rounded-lg p-3">
          {navItems?.length > 0 &&
            navItems.map((item, idx) => (
              <span className="flex items-center bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                {item}
                <button
                  className="ml-2 text-red-500 font-bold"
                  onClick={() =>
                    setNavItems(navItems.filter((_, i) => i != idx))
                  }
                >
                  ×
                </button>
              </span>
            ))}
        </div>

        <div className="flex gap-2 mt-2">
          <input
            className="flex-1 rounded-lg border px-3 py-2 text-sm
                       focus:ring-2 focus:ring-blue-500 outline-none"
            placeholder="Add Navbar Items"
            input={input}
            onChange={(e) => {
              setInput(e.target.value);
            }}
          />
          <button
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm
                       hover:bg-blue-700 disabled:opacity-50"
            disabled={!input}
            onClick={() => {
              setNavItems([...navItems, input.trim()]);
              setInput("");
            }}
          >
            ADD{" "}
          </button>
        </div>
      </div> */}

        <p className="font-semibold mb-2">Navbar Items</p>

        {formData.navbar.items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              value={item}
              placeholder="Navbar Item"
              onChange={(e) => {
                const updated = [...formData.navbar.items];
                updated[index] = e.target.value;

                setFormData({
                  ...formData,
                  navbar: {
                    ...formData.navbar,
                    items: updated,
                  },
                });
              }}
              className="border p-2 flex-1"
            />

            <button
              onClick={() => {
                const updated = formData.navbar.items.filter(
                  (_, i) => i !== index,
                );

                setFormData({
                  ...formData,
                  navbar: {
                    ...formData.navbar,
                    items: updated,
                  },
                });
              }}
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setFormData({
              ...formData,
              navbar: {
                ...formData.navbar,
                items: [...formData.navbar.items, ""],
              },
            })
          }
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Item
        </button>
      </div>

      {/* Banner */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Hero Section</h2>

        <input
          placeholder="Banner Image URL"
          value={formData.bannerImage}
          onChange={(e) => handleRootChange("bannerImage", e.target.value)}
          className="border p-2 w-full mb-2 rounded-lg"
        />

        <input
          placeholder="Hero Title"
          value={formData.title}
          onChange={(e) => handleRootChange("title", e.target.value)}
          className="border p-2 w-full rounded-lg"
        />
      </div>

      {/* Hero Buttons */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Hero Buttons</h2>

        {formData.buttons.map((btn, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              value={btn}
              placeholder="Button Text"
              onChange={(e) => {
                const updated = [...formData.buttons];
                updated[index] = e.target.value;

                setFormData({
                  ...formData,
                  buttons: updated,
                });
              }}
              className="border p-2 flex-1 rounded-lg"
            />
            <button
              onClick={() => {
                const updated = formData.buttons.filter((_, i) => i !== index);

                setFormData({
                  ...formData,
                  buttons: updated,
                });
              }}
              className="bg-red-500 text-white px-2 rounded-lg"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            setFormData({
              ...formData,
              buttons: [...formData.buttons, ""],
            });
          }}
          className="bg-green-600 text-white px-3 py-1 rounded-lg"
        >
          Add Button
        </button>
      </div>

      {/* Events */}
      <div className="border p-4 rounded-lg ">
        <h2 className="text-xl font-semibold mb-2">Events</h2>

        {formData.events.map((event, index) => (
          <div key={index} className="border p-3 mb-4 relative rounded-lg">
            <button
              className="text-red-500 absolute mb-[1rem] right-4 hover:text-red-700 font-bold"
              onClick={() => {
                const updated = formData.events.filter((_, i) => i != index);
                setFormData({ ...formData, events: updated });
              }}
            >
              X
            </button>
            <div className="mt-8">
              <input
                placeholder="Date"
                value={event.date}
                onChange={(e) =>
                  handleEventChange(index, "date", e.target.value)
                }
                className="border p-2 w-full mb-2 rounded-lg"
              />
              <input
                placeholder="Title"
                value={event.title}
                onChange={(e) =>
                  handleEventChange(index, "title", e.target.value)
                }
                className="border p-2 w-full mb-2 rounded-lg"
              />
              <input
                placeholder="Location"
                value={event.location}
                onChange={(e) =>
                  handleEventChange(index, "location", e.target.value)
                }
                className="border p-2 w-full mb-2 rounded-lg"
              />
              <input
                placeholder="Image URL"
                value={event.imageUrl}
                onChange={(e) =>
                  handleEventChange(index, "imageUrl", e.target.value)
                }
                className="border p-2 w-full mb-2 rounded-lg"
              />
              <textarea
                placeholder="Description"
                value={event.description}
                onChange={(e) =>
                  handleEventChange(index, "description", e.target.value)
                }
                className="border p-2 w-full rounded-lg"
              />
            </div>
          </div>
        ))}

        <button
          onClick={addEvent}
          className="bg-green-600 text-white px-4 py-2 rounded-lg"
        >
          Add Event
        </button>
      </div>

      {/* Footer */}
      <div className="border p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Footer</h2>

        <input
          placeholder="Footer Title"
          value={formData.footer.title}
          onChange={(e) => handleChange("footer", "title", e.target.value)}
          className="border p-2 w-full mb-2 rounded-lg"
        />

        <input
          placeholder="Footer Background Color"
          value={formData.footer.bgclr}
          onChange={(e) => handleChange("footer", "bgclr", e.target.value)}
          className="border p-2 w-full rounded-lg"
        />

        <p className="font-semibold mt-4 mb-2">Footer Items</p>

        {formData.footer.items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <input
              value={item}
              placeholder="Footer Item"
              onChange={(e) => {
                const updated = [...formData.footer.items];
                updated[index] = e.target.value;

                setFormData({
                  ...formData,
                  footer: {
                    ...formData.footer,
                    items: updated,
                  },
                });
              }}
              className="border p-2 flex-1"
            />

            <button
              onClick={() => {
                const updated = formData.footer.items.filter(
                  (_, i) => i !== index,
                );

                setFormData({
                  ...formData,
                  footer: {
                    ...formData.footer,
                    items: updated,
                  },
                });
              }}
              className="bg-red-500 text-white px-2 rounded"
            >
              X
            </button>
          </div>
        ))}

        <button
          onClick={() =>
            setFormData({
              ...formData,
              footer: {
                ...formData.footer,
                items: [...formData.footer.items, ""],
              },
            })
          }
          className="bg-green-600 text-white px-3 py-1 rounded"
        >
          Add Footer Item
        </button>
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white p-3 rounded-lg"
      >
        Save Homepage
      </button>
    </div>
  );
}
