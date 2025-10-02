const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample DNS records
  const dnsRecords = await prisma.dnsRecord.createMany({
    data: [
      {
        domain: 'dev0-1.com',
        recordType: 'A',
        ttl: 3600,
        value: '104.198.14.52',
        isActive: true
      },
      {
        domain: 'dev0-1.com',
        recordType: 'AAAA',
        ttl: 3600,
        value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
        isActive: true
      },
      {
        domain: 'www.dev0-1.com',
        recordType: 'CNAME',
        ttl: 3600,
        value: 'dev0-1.com',
        isActive: true
      },
      {
        domain: 'dev0-1.com',
        recordType: 'MX',
        ttl: 3600,
        value: '10 mail.dev0-1.com',
        priority: 10,
        isActive: true
      },
      {
        domain: 'dev0-1.com',
        recordType: 'TXT',
        ttl: 3600,
        value: 'v=spf1 include:_spf.google.com ~all',
        isActive: true
      },
      {
        domain: 'dev0-1.com',
        recordType: 'NS',
        ttl: 3600,
        value: 'ns1.digitalocean.com',
        isActive: true
      },
      {
        domain: 'dev0-1.com',
        recordType: 'NS',
        ttl: 3600,
        value: 'ns2.digitalocean.com',
        isActive: true
      },
      {
        domain: 'dev0-1.com',
        recordType: 'NS',
        ttl: 3600,
        value: 'ns3.digitalocean.com',
        isActive: true
      }
    ],
    skipDuplicates: true
  });

  // Create sample settings
  const settings = await prisma.setting.createMany({
    data: [
      {
        key: 'site_name',
        value: 'DNS Monitor',
        description: 'Site name for the application'
      },
      {
        key: 'default_ttl',
        value: '3600',
        description: 'Default TTL for DNS records'
      },
      {
        key: 'monitoring_interval',
        value: '300',
        description: 'DNS monitoring interval in seconds'
      }
    ],
    skipDuplicates: true
  });

  // Create sample repositories
  const repositories = await prisma.repository.createMany({
    data: [
      {
        name: 'website-dev0-1',
        fullName: 'anshulyadav32/website-dev0-1',
        description: 'Full-stack DNS management application with React, Node.js, and PostgreSQL. Features authentication, DNS record management, and real-time monitoring.',
        htmlUrl: 'https://github.com/anshulyadav32/website-dev0-1',
        cloneUrl: 'https://github.com/anshulyadav32/website-dev0-1.git',
        language: 'TypeScript',
        stars: 15,
        forks: 3,
        watchers: 8,
        openIssues: 2,
        size: 2048,
        isPrivate: false,
        isFork: false,
        isArchived: false,
        topics: ['react', 'nodejs', 'postgresql', 'dns', 'typescript'],
        pushedAt: new Date(),
        lastCommit: 'a1b2c3d4e5f6'
      },
      {
        name: 'setupx-linux-server',
        fullName: 'anshulyadav32/setupx-linux-server',
        description: 'One-line installer for Linux server setup with automated configuration for development environments, databases, and deployment tools.',
        htmlUrl: 'https://github.com/anshulyadav32/setupx-linux-server',
        cloneUrl: 'https://github.com/anshulyadav32/setupx-linux-server.git',
        language: 'Shell',
        stars: 25,
        forks: 5,
        watchers: 12,
        openIssues: 1,
        size: 1024,
        isPrivate: false,
        isFork: false,
        isArchived: false,
        topics: ['bash', 'linux', 'automation', 'devops', 'server-setup'],
        pushedAt: new Date(),
        lastCommit: 'b2c3d4e5f6g7'
      },
      {
        name: 'portfolio-website',
        fullName: 'anshulyadav32/portfolio-website',
        description: 'Personal portfolio website showcasing projects and skills. Built with modern web technologies.',
        htmlUrl: 'https://github.com/anshulyadav32/portfolio-website',
        cloneUrl: 'https://github.com/anshulyadav32/portfolio-website.git',
        language: 'JavaScript',
        stars: 8,
        forks: 2,
        watchers: 5,
        openIssues: 0,
        size: 512,
        isPrivate: false,
        isFork: false,
        isArchived: false,
        topics: ['portfolio', 'website', 'javascript', 'css', 'html'],
        pushedAt: new Date(),
        lastCommit: 'c3d4e5f6g7h8'
      }
    ],
    skipDuplicates: true
  });

  // Create personal information
  const personalInfo = await prisma.personalInfo.create({
    data: {
      name: 'Anshul Yadav',
      title: 'Full-Stack Developer & Open Source Enthusiast',
      bio: 'Passionate full-stack developer with expertise in modern web technologies. I love building scalable applications, contributing to open source projects, and helping the developer community grow. My journey from "Developer 0 to No.1" represents continuous learning and improvement in the tech world.',
      email: 'anshul@dev0-1.com',
      phone: '+91-9876543210',
      location: 'India',
      website: 'https://dev0-1.com',
      avatarUrl: 'https://avatars.githubusercontent.com/u/anshulyadav32',
      githubUrl: 'https://github.com/anshulyadav32',
      linkedinUrl: 'https://linkedin.com/in/anshulyadav32',
      twitterUrl: 'https://twitter.com/anshulyadav32',
      skills: [
        'React', 'Node.js', 'TypeScript', 'JavaScript', 'Python',
        'PostgreSQL', 'MongoDB', 'Prisma', 'Express.js', 'Next.js',
        'Docker', 'Kubernetes', 'AWS', 'Git', 'Linux', 'Bash',
        'HTML', 'CSS', 'Tailwind CSS', 'Styled Components'
      ],
      interests: [
        'Web Development', 'Open Source', 'DevOps', 'Cloud Computing',
        'Machine Learning', 'Data Science', 'Mobile Development',
        'UI/UX Design', 'System Architecture', 'Database Design'
      ],
      experience: 5,
      education: 'Bachelor of Technology in Computer Science',
      certifications: [
        'AWS Certified Developer',
        'Google Cloud Professional',
        'Docker Certified Associate',
        'Kubernetes Administrator'
      ],
      languages: ['English', 'Hindi', 'Spanish'],
      timezone: 'Asia/Kolkata',
      availability: 'Available for freelance projects',
      resumeUrl: 'https://dev0-1.com/resume.pdf',
      isActive: true
    }
  });

  console.log('✅ Database seeded successfully!');
  console.log(`📊 Created ${dnsRecords.count} DNS records`);
  console.log(`⚙️ Created ${settings.count} settings`);
  console.log(`📁 Created ${repositories.count} repositories`);
  console.log(`👤 Created personal information for ${personalInfo.name}`);
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
