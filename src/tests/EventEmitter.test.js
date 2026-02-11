import EventEmitter from "../utils/EventEmitter";

describe("EventEmitter", () => {
  let emitter;

  beforeEach(() => {
    emitter = new EventEmitter();
  });

  describe("on() - Subscribe to events", () => {
    test("should add event listener and call it when event is emitted", () => {
      const callback = jest.fn();
      emitter.on("test", callback);

      emitter.emit("test", { data: "hello" });

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith({ data: "hello" });
    });

    test("should support multiple listeners for the same event", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on("test", callback1);
      emitter.on("test", callback2);

      emitter.emit("test", "data");

      expect(callback1).toHaveBeenCalledWith("data");
      expect(callback2).toHaveBeenCalledWith("data");
    });

    test("should return unsubscribe function", () => {
      const callback = jest.fn();
      const unsubscribe = emitter.on("test", callback);

      unsubscribe();
      emitter.emit("test", "data");

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe("emit() - Trigger events", () => {
    test("should not throw error when emitting event with no listeners", () => {
      expect(() => {
        emitter.emit("nonexistent", "data");
      }).not.toThrow();
    });

    test("should pass data to listeners", () => {
      const callback = jest.fn();
      emitter.on("test", callback);

      const testData = { id: 1, message: "hello" };
      emitter.emit("test", testData);

      expect(callback).toHaveBeenCalledWith(testData);
    });

    test("should call listeners in order they were added", () => {
      const callOrder = [];
      emitter.on("test", () => callOrder.push(1));
      emitter.on("test", () => callOrder.push(2));
      emitter.on("test", () => callOrder.push(3));

      emitter.emit("test");

      expect(callOrder).toEqual([1, 2, 3]);
    });
  });

  describe("off() - Unsubscribe from events", () => {
    test("should remove specific listener", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on("test", callback1);
      emitter.on("test", callback2);
      emitter.off("test", callback1);

      emitter.emit("test", "data");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).toHaveBeenCalledWith("data");
    });

    test("should not throw error when removing non-existent listener", () => {
      expect(() => {
        emitter.off("test", jest.fn());
      }).not.toThrow();
    });
  });

  describe("once() - One-time subscription", () => {
    test("should call listener only once", () => {
      const callback = jest.fn();
      emitter.once("test", callback);

      emitter.emit("test", "data1");
      emitter.emit("test", "data2");
      emitter.emit("test", "data3");

      expect(callback).toHaveBeenCalledTimes(1);
      expect(callback).toHaveBeenCalledWith("data1");
    });

    test("should automatically unsubscribe after first call", () => {
      const callback = jest.fn();
      emitter.once("test", callback);

      emitter.emit("test");
      expect(emitter.listenerCount("test")).toBe(0);
    });
  });

  describe("removeAllListeners() - Clear listeners", () => {
    test("should remove all listeners for specific event", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on("test", callback1);
      emitter.on("test", callback2);
      emitter.removeAllListeners("test");

      emitter.emit("test");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });

    test("should remove all listeners for all events", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn();

      emitter.on("event1", callback1);
      emitter.on("event2", callback2);
      emitter.removeAllListeners();

      emitter.emit("event1");
      emitter.emit("event2");

      expect(callback1).not.toHaveBeenCalled();
      expect(callback2).not.toHaveBeenCalled();
    });
  });

  describe("listenerCount() - Get listener count", () => {
    test("should return correct number of listeners", () => {
      emitter.on("test", jest.fn());
      emitter.on("test", jest.fn());
      emitter.on("test", jest.fn());

      expect(emitter.listenerCount("test")).toBe(3);
    });

    test("should return 0 for events with no listeners", () => {
      expect(emitter.listenerCount("nonexistent")).toBe(0);
    });

    test("should update count after removing listeners", () => {
      const callback = jest.fn();
      emitter.on("test", callback);
      expect(emitter.listenerCount("test")).toBe(1);

      emitter.off("test", callback);
      expect(emitter.listenerCount("test")).toBe(0);
    });
  });

  describe("Memory management", () => {
    test("should not leak memory with multiple subscribe/unsubscribe cycles", () => {
      for (let i = 0; i < 1000; i++) {
        const unsubscribe = emitter.on("test", jest.fn());
        unsubscribe();
      }

      expect(emitter.listenerCount("test")).toBe(0);
    });

    test("should handle removal during event emission", () => {
      const callback1 = jest.fn();
      const callback2 = jest.fn(() => {
        emitter.off("test", callback1);
      });

      emitter.on("test", callback1);
      emitter.on("test", callback2);

      emitter.emit("test");
      emitter.emit("test");

      expect(callback1).toHaveBeenCalledTimes(1);
      expect(callback2).toHaveBeenCalledTimes(2);
    });
  });

  describe("Edge cases", () => {
    test("should handle undefined data", () => {
      const callback = jest.fn();
      emitter.on("test", callback);

      emitter.emit("test", undefined);

      expect(callback).toHaveBeenCalledWith(undefined);
    });

    test("should handle null data", () => {
      const callback = jest.fn();
      emitter.on("test", callback);

      emitter.emit("test", null);

      expect(callback).toHaveBeenCalledWith(null);
    });

    test("should handle complex nested data", () => {
      const callback = jest.fn();
      emitter.on("test", callback);

      const complexData = {
        nested: {
          deeply: {
            value: "test",
            array: [1, 2, 3],
          },
        },
      };

      emitter.emit("test", complexData);

      expect(callback).toHaveBeenCalledWith(complexData);
    });
  });
});
