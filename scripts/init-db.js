const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Initializing database...');
  
  try {
    // Test the database connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // You can add any initial data seeding here if needed
    // For example:
    // await prisma.user.create({
    //   data: {
    //     name: 'Admin User',
    //     email: 'admin@example.com',
    //   },
    // });
    
    console.log('✅ Database initialization complete');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main(); 