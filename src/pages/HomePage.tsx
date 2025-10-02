import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/StyledComponents';
import PersonalInfo from '../components/PersonalInfo';

const HeroSection = styled.section`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 0;
  text-align: center;
  margin-bottom: 3rem;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  background: linear-gradient(45deg, #fff, #f0f0f0);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  margin-bottom: 2rem;
  opacity: 0.9;
`;

const DeveloperBadge = styled.div`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  font-weight: 600;
  margin-bottom: 2rem;
  backdrop-filter: blur(10px);
`;

const ProjectsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin: 3rem 0;
`;

const ProjectCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  border: 1px solid #e5e7eb;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  }
`;

const ProjectTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: #1f2937;
`;

const ProjectDescription = styled.p`
  color: #6b7280;
  margin-bottom: 1.5rem;
  line-height: 1.6;
`;

const TechStack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
`;

const TechTag = styled.span`
  background: #f3f4f6;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
`;

// ProjectDomain styled component removed as it's not used

const ProjectLinks = styled.div`
  display: flex;
  gap: 1rem;
`;

const ProjectLink = styled.a`
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border: 2px solid #3b82f6;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: #3b82f6;
    color: white;
  }
`;

const StatsSection = styled.section`
  background: #f8fafc;
  padding: 3rem 0;
  margin: 3rem 0;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  text-align: center;
`;

const StatItem = styled.div`
  padding: 1.5rem;
`;

const StatNumber = styled.div`
  font-size: 3rem;
  font-weight: 700;
  color: #3b82f6;
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: #6b7280;
  font-weight: 500;
`;

const AboutSection = styled.section`
  padding: 3rem 0;
  text-align: center;
`;

const AboutTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  color: #1f2937;
`;

const AboutText = styled.p`
  font-size: 1.2rem;
  color: #6b7280;
  max-width: 800px;
  margin: 0 auto 2rem;
  line-height: 1.6;
`;

const ContactSection = styled.section`
  background: #1f2937;
  color: white;
  padding: 3rem 0;
  text-align: center;
`;

const ContactTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
`;

const ContactLinks = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ContactLink = styled.a`
  color: white;
  text-decoration: none;
  font-weight: 500;
  padding: 1rem 2rem;
  border: 2px solid white;
  border-radius: 8px;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    color: #1f2937;
  }
`;

interface Repository {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  cloneUrl: string;
  language: string | null;
  stars: number;
  forks: number;
  watchers: number;
  openIssues: number;
  size: number;
  isPrivate: boolean;
  isFork: boolean;
  isArchived: boolean;
  topics: string[];
  createdAt: string;
  updatedAt: string;
  pushedAt: string | null;
  lastCommit: string | null;
}

const HomePage: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const response = await fetch('/api/repositories');
        if (!response.ok) {
          throw new Error('Failed to fetch repositories');
        }
        const data = await response.json();
        setRepositories(data);
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to load repository data');
        // Fallback to static data
        setRepositories([
          {
            id: 1,
            name: "website-dev0-1",
            fullName: "anshulyadav32/website-dev0-1",
            description: "Full-stack DNS management application with React, Node.js, and PostgreSQL. Features authentication, DNS record management, and real-time monitoring. This domain showcases my journey from Developer 0 to No.1.",
            htmlUrl: "https://github.com/anshulyadav32/website-dev0-1",
            cloneUrl: "https://github.com/anshulyadav32/website-dev0-1.git",
            language: "TypeScript",
            stars: 15,
            forks: 3,
            watchers: 8,
            openIssues: 2,
            size: 2048,
            isPrivate: false,
            isFork: false,
            isArchived: false,
            topics: ["react", "nodejs", "postgresql", "dns", "typescript"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            pushedAt: new Date().toISOString(),
            lastCommit: "a1b2c3d4e5f6"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepositories();
  }, []);

  return (
    <div>
      <HeroSection>
        <Container>
          <DeveloperBadge>Developer 0 → No.1</DeveloperBadge>
          <HeroTitle>Anshul Yadav</HeroTitle>
          <HeroSubtitle>Full-Stack Developer & Open Source Enthusiast</HeroSubtitle>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>
            Building scalable web applications and contributing to the open source community
          </p>
        </Container>
      </HeroSection>

      <PersonalInfo />

      <Container>
        <AboutSection>
          <AboutTitle>About This Domain</AboutTitle>
          <AboutText>
            <strong>dev0-1.com</strong> represents my journey from "Developer 0 to No.1" - a continuous learning path 
            in the tech world. This domain showcases my full-stack development skills, open source contributions, 
            and professional growth as a developer.
          </AboutText>
          <AboutText>
            Built with modern technologies including React, Node.js, PostgreSQL, and Prisma ORM, 
            this platform demonstrates real-world application development, authentication systems, 
            and database management.
          </AboutText>
          <AboutText>
            <strong>GitHub Repository:</strong> <a href="https://github.com/anshulyadav32/website-dev0-1" target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none' }}>github.com/anshulyadav32/website-dev0-1</a>
          </AboutText>
        </AboutSection>

        <StatsSection>
          <Container>
            <StatsGrid>
              <StatItem>
                <StatNumber>15+</StatNumber>
                <StatLabel>Open Source Projects</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>5+</StatNumber>
                <StatLabel>Years Experience</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>500+</StatNumber>
                <StatLabel>GitHub Contributions</StatLabel>
              </StatItem>
              <StatItem>
                <StatNumber>dev0-1.com</StatNumber>
                <StatLabel>Primary Domain</StatLabel>
              </StatItem>
            </StatsGrid>
          </Container>
        </StatsSection>

        <section style={{ padding: '3rem 0', background: '#f8fafc' }}>
          <Container>
            <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center', color: '#1f2937' }}>
              Domain Information
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>🌐 dev0-1.com</h3>
                <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
                  Primary domain showcasing my developer journey from 0 to No.1. 
                  Features full-stack applications, portfolio, and open source projects.
                </p>
                <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                  <a href="https://github.com/anshulyadav32/website-dev0-1" target="_blank" rel="noopener noreferrer" 
                     style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                    📁 GitHub Repository
                  </a>
                  <a href="https://dev0-1.com" target="_blank" rel="noopener noreferrer" 
                     style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: '500' }}>
                    🚀 Live Website
                  </a>
                </div>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>🛠️ Technology Stack</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem' }}>
                  <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>React</span>
                  <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>Node.js</span>
                  <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>PostgreSQL</span>
                  <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>Prisma</span>
                  <span style={{ background: '#f3f4f6', color: '#374151', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '0.875rem' }}>TypeScript</span>
                </div>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                  Modern full-stack development with authentication, database management, and real-time features.
                </p>
              </div>
              
              <div style={{ background: 'white', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
                <h3 style={{ color: '#1f2937', marginBottom: '1rem' }}>📊 Development Stats</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>GitHub Stars:</span>
                    <span style={{ fontWeight: '600' }}>50+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Forks:</span>
                    <span style={{ fontWeight: '600' }}>25+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Contributors:</span>
                    <span style={{ fontWeight: '600' }}>5+</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: '#6b7280' }}>Languages:</span>
                    <span style={{ fontWeight: '600' }}>TypeScript, JavaScript</span>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </section>

        <section>
          <h2 style={{ fontSize: '2.5rem', fontWeight: '700', marginBottom: '2rem', textAlign: 'center', color: '#1f2937' }}>
            Featured Projects
          </h2>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>
              <p>Loading repositories...</p>
            </div>
          ) : error ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#ef4444' }}>
              <p>{error}</p>
            </div>
          ) : (
            <ProjectsGrid>
              {repositories.map((repo) => (
                <ProjectCard key={repo.id}>
                  <ProjectTitle>{repo.name}</ProjectTitle>
                  <ProjectDescription>{repo.description || 'No description available'}</ProjectDescription>
                  <div style={{ background: '#f0f9ff', color: '#0369a1', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.875rem', fontWeight: '500', marginBottom: '1rem', border: '1px solid #bae6fd' }}>
                    🌐 Repository: {repo.fullName}
                  </div>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    <span>⭐ {repo.stars}</span>
                    <span>🍴 {repo.forks}</span>
                    <span>👀 {repo.watchers}</span>
                    <span>🐛 {repo.openIssues}</span>
                  </div>
                  <TechStack>
                    {repo.language && <TechTag>{repo.language}</TechTag>}
                    {repo.topics.slice(0, 4).map((topic, index) => (
                      <TechTag key={index}>{topic}</TechTag>
                    ))}
                  </TechStack>
                  <ProjectLinks>
                    <ProjectLink href={repo.htmlUrl} target="_blank" rel="noopener noreferrer">
                      📁 GitHub
                    </ProjectLink>
                    <ProjectLink href={repo.cloneUrl} target="_blank" rel="noopener noreferrer">
                      🔗 Clone
                    </ProjectLink>
                  </ProjectLinks>
                </ProjectCard>
              ))}
            </ProjectsGrid>
          )}
        </section>
      </Container>

      <ContactSection>
        <Container>
          <ContactTitle>Get In Touch</ContactTitle>
          <p style={{ fontSize: '1.2rem', marginBottom: '2rem', opacity: 0.9 }}>
            Let's collaborate on your next project or discuss open source opportunities
          </p>
          <ContactLinks>
            <ContactLink href="https://github.com/anshulyadav32" target="_blank" rel="noopener noreferrer">
              GitHub
            </ContactLink>
            <ContactLink href="mailto:anshul@dev0-1.com">
              Email
            </ContactLink>
            <ContactLink href="https://linkedin.com/in/anshulyadav32" target="_blank" rel="noopener noreferrer">
              LinkedIn
            </ContactLink>
            <ContactLink href="https://twitter.com/anshulyadav32" target="_blank" rel="noopener noreferrer">
              Twitter
            </ContactLink>
          </ContactLinks>
        </Container>
      </ContactSection>
    </div>
  );
};

export default HomePage;
