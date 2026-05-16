import bcrypt from "bcrypt";
import { db } from "@/lib/db";

async function main() {
    console.log("🌱 Début du seeding...");
    
    await db.question.deleteMany({});
    await db.session.deleteMany({});
    await db.event.deleteMany({});
    await db.speaker.deleteMany({});
    await db.room.deleteMany({});
    await db.user.deleteMany({});

    const plainPassword = "123456"
    const hashedPassword = await bcrypt.hash(plainPassword, 12);

    console.log(`🔐 Mot de passe admin hashé (mot de passe clair : ${plainPassword})`);

    const admin = await db.user.upsert({
        where: { email: "eventify@eventify.mg" },
        update: {
            email: "mathieu@eventify.mg",
            password: hashedPassword,
            name: "RAKOTOARISOA Mathieu",
            role: "ADMIN"
        },
        create: {
            email: "mathieu@eventify.mg",
            password: hashedPassword,
            name: "RAKOTOARISOA Mathieu",
            role: "ADMIN"
        },
    });

    console.log(`✅ Admin créé : ${admin.email}`);

    const rooms = await Promise.all([
        db.room.upsert({
            where: { name: "Salle NP" },
            update: {},
            create: { name: "Salle NP" },
        }),
        db.room.upsert({
            where: { name: "Salle Pi" },
            update: {},
            create: { name: "Salle Pi" },
        }),
        db.room.upsert({
            where: { name: "Salle B" },
            update: {},
            create: { name: "Salle B" },
        }),
        db.room.upsert({
            where: { name: "Salle Sigma" },
            update: {},
            create: { name: "Salle Sigma" },
        }),
    ]);

    console.log(`✅ ${rooms.length} salles créées`);

    // ====================== 3. SPEAKERS ======================
    const speakers = await Promise.all([
        db.speaker.create({
            data: {
                fullName: "Dr. RAKOTOARISOA Jean",
                bio: "Expert en Intelligence Artificielle et transformation digitale.",
                photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
                linkedinUrl: "https://linkedin.com/in/jeanrakoto",
            },
        }),
        db.speaker.create({
            data: {
                fullName: "Mme. RANDRIANARISOA Marie",
                bio: "CEO de TechMadagascar - Spécialiste en entrepreneuriat féminin.",
                photoUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
            },
        }),
        db.speaker.create({
            data: {
                fullName: "Pr. ANDRIANOMENJANAHARY Paul",
                bio: "Professeur en Sciences des Données à l'Université d'Antananarivo.",
            },
        }),
    ]);

    console.log(`✅ ${speakers.length} speakers créés`);

    // ====================== 4. EVENT ======================
    const event = await db.event.create({
        data: {
            title: "Madagascar Tech Summit 2026",
            slug: "madagascar-tech-summit-2026",
            description: "Le plus grand rassemblement technologique de Madagascar.",
            startDate: new Date("2026-07-15T08:00:00Z"),
            endDate: new Date("2026-07-17T18:00:00Z"),
            location: "Hôtel Carlton, Antananarivo",
            organizerId: admin.id,
        },
    });

    console.log(`✅ Événement créé : ${event.title}`);

    // ====================== 5. SESSIONS ======================
    const session1 = await db.session.create({
        data: {
            title: "L'avenir de l'IA à Madagascar",
            description: "Opportunités, défis et stratégie nationale pour l'intelligence artificielle.",
            startTime: new Date("2026-07-15T09:00:00Z"),
            endTime: new Date("2026-07-15T10:30:00Z"),
            capacity: 150,
            eventId: event.id,
            roomId: rooms[0].id, // Salle Principale
            speakers: {
                connect: [{ id: speakers[0].id }, { id: speakers[2].id }],
            },
        },
    });

    const session2 = await db.session.create({
        data: {
            title: "Entrepreneuriat Tech : Comment scaler sa startup ?",
            description: "Expériences, financement et stratégies de croissance.",
            startTime: new Date("2026-07-15T11:00:00Z"),
            endTime: new Date("2026-07-15T12:30:00Z"),
            capacity: 120,
            eventId: event.id,
            roomId: rooms[1].id, // Salle A
            speakers: {
                connect: [{ id: speakers[1].id }],
            },
        },
    });

    console.log(`✅ ${2} sessions créées`);

    // ====================== 6. QUESTIONS ======================
    await db.question.createMany({
        data: [
            {
                content: "Quels sont les principaux défis infrastructurels pour déployer l'IA à Madagascar ?",
                authorName: "Hery Rakoto",
                sessionId: session1.id,
                upvotes: 15,
            },
            {
                content: "Existe-t-il des programmes de soutien gouvernemental pour les startups IA ?",
                authorName: "Sophie Andrian",
                sessionId: session1.id,
                upvotes: 9,
            },
            {
                content: "Comment trouver des investisseurs pour une startup tech à Madagascar ?",
                authorName: "Michel Raja",
                sessionId: session2.id,
                upvotes: 22,
            },
        ],
    });

    console.log("✅ Questions ajoutées");

    console.log("\n🎉 SEEDING TERMINÉ AVEC SUCCÈS !");
}

main()
    .catch((e) => {
        console.error("❌ Erreur lors du seeding :", e);
        process.exit(1);
    })
    .finally(async () => {
        await db.$disconnect();
    });