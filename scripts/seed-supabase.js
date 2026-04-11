import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://cdhcvbvqreusoxysdbok.supabase.co";
const supabaseAnonKey = "sb_publishable_WvdeLE_JDVxAos5aLmFAGw_K1N-Al55";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
  console.log("Seeding Supabase with test invitation data...");

  const invitationId = "prashant-sujata-2025"; // Back to your preferred ID
  const bucketUrl =
    "https://cdhcvbvqreusoxysdbok.supabase.co/storage/v1/object/public/weding-bucket";

  const invitationData = {
    uid: invitationId,
    title: "Sacred Matrimony",
    description:
      "With the blessings of our elders and the grace of the Almighty, we cordially invite you to the sacred union of our families.",
    groom_name: "Prashant",
    bride_name: "Sujata",
    parent_groom: "Mr Groom & Mrs Groom",
    parent_bride: "Mr Bride & Mrs Bride",
    wedding_date: "2025-06-19",
    time: "10:00 AM onwards",
    location: "Royal Heritage Resant",
    address: "123 Wedding Street, City, State",
    maps_url: "https://goo.gl/maps/example",
    maps_embed: "https://www.google.com/maps/embed?pb=example",
    og_image: `${bucketUrl}/og-image.jpg`,
    favicon: `${bucketUrl}/favicon.svg`,
    couple_image: `${bucketUrl}/couple.png`,
    groom_image: `${bucketUrl}/groom.png`,
    bride_image: `${bucketUrl}/bride.png`,
    audio: {
      src: `${bucketUrl}/background.mp3`,
      title: "Traditional Sacred Vows",
      autoplay: true,
      loop: true,
    },
    agenda: [
      {
        title: "Tilak",
        date: "2025-06-13",
        start_time: "06:00 PM",
        end_time: "10:00 PM",
        location: "Grand Palace",
        address: "789 Tradition Road",
      },
      {
        title: "Katha & Matkor",
        date: "2025-06-18",
        start_time: "10:00 AM",
        end_time: "02:00 PM",
        location: "Ancestral Home",
        address: "45 Genealogy Lane",
      },
      {
        title: "Wedding (Ffere)",
        date: "2025-06-19",
        start_time: "10:00 PM",
        end_time: "04:00 AM",
        location: "Royal Heritage Resort",
        address: "123 Wedding Street",
      },
      {
        title: "Reception",
        date: "2025-06-21",
        start_time: "07:00 PM",
        end_time: "11:30 PM",
        location: "Emerald Ballroom",
        address: "55 Celebration Drive",
      },
    ],
    banks: [
      {
        bank: "Example Bank",
        account_number: "1234567890",
        account_name: "PRASHANT & SUJATA",
      },
    ],
  };

  // Upsert invitation
  const { error: invError } = await supabase
    .from("invitations")
    .upsert(invitationData, { onConflict: "uid" });

  if (invError) {
    console.error("Error seeding invitation:", invError);
  } else {
    console.log(`✓ Created/Updated invitation: ${invitationId}`);
  }

  // Add sample wishes
  const wishesData = [
    {
      invitation_uid: invitationId,
      name: "John Doe",
      message: "Wishing you both a lifetime of happiness!",
      attendance: "ATTENDING",
    },
    {
      invitation_uid: invitationId,
      name: "Jane Smith",
      message: "Congratulations on your wedding!",
      attendance: "ATTENDING",
    },
    {
      invitation_uid: invitationId,
      name: "Bob Johnson",
      message: "May your love grow stronger every day!",
      attendance: "MAYBE",
    },
  ];

  const { error: wishError } = await supabase.from("wishes").insert(wishesData);

  if (wishError) {
    // Duplicates might fail if name + invitation_uid is unique
    console.warn(
      "Wishes seeding warning (might be duplicates):",
      wishError.message,
    );
  } else {
    console.log(`✓ Added ${wishesData.length} sample wishes`);
  }

  console.log("\n✅ Supabase seeding complete!");
  console.log(
    `\nVisit the app at: http://localhost:5173/invitation/${invitationId}`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
