import { firestore_db } from "~/server/firebase/firebase-admin";

const get_activities = async (
  limit = 10,
  startAfter = null,
  endBefore = null
) => {
  let collection = firestore_db.collection("activity_log");

  let query = collection.orderBy("created_at", "desc").limit(limit);

  // If lastVisible is provided, start after it
  if (startAfter) {
    query = query.startAfter(startAfter);
  }

  if (endBefore) {
    query = query.endBefore(endBefore);
  }

  const snapshot = await query.get();

  if (snapshot.empty) {
    console.log("No matching documents.");
    return { activities: [], startAfter: null, endBefore: null };
  }

  const activities = snapshot.docs.map((doc) => {
    const data = doc.data();
    const createdAt = data.created_at?.toDate(); // Firestore Timestamp to JS Date

    // Format date like "Date: January 1, 2022"
    const formattedDate = createdAt
      ? `${createdAt.toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}`
      : "";

    const formattedTime = createdAt.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });

    return {
      id: doc.id,
      ...data,
      formattedDate,
      formattedTime,
    };
  });

  // Save last doc for next page
  const newStartAfter = snapshot.docs[snapshot.docs.length - 1];
  const newEndBefore = snapshot.docs[0];

  return { activities, startAfter: newStartAfter, endBefore: newEndBefore };
};

export { get_activities };
