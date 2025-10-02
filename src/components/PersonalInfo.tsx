import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '../styles/StyledComponents';

const PersonalInfoContainer = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 0;
  margin: 2rem 0;
  border-radius: 12px;
`;

const PersonalInfoContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
  align-items: center;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const AvatarSection = styled.div`
  text-align: center;
`;

const Avatar = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.3);
  object-fit: cover;
  margin-bottom: 1rem;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  color: white;
`;

const Title = styled.h2`
  font-size: 1.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: rgba(255, 255, 255, 0.9);
`;

const Bio = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.9);
`;

const InfoSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const InfoCard = styled.div`
  background: rgba(255, 255, 255, 0.1);
  padding: 1.5rem;
  border-radius: 8px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const InfoTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: white;
`;

const InfoList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const InfoItem = styled.li`
  padding: 0.5rem 0;
  color: rgba(255, 255, 255, 0.9);
  font-size: 0.95rem;
`;

const SkillTag = styled.span`
  display: inline-block;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.85rem;
  margin: 0.25rem 0.25rem 0.25rem 0;
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
`;

const SocialLink = styled.a`
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const LoadingMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #6b7280;
`;

const ErrorMessage = styled.div`
  text-align: center;
  padding: 2rem;
  color: #ef4444;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  margin: 1rem 0;
`;

interface PersonalInfoData {
  id: number;
  name: string;
  title: string;
  bio: string;
  email: string;
  phone?: string;
  location?: string;
  website?: string;
  avatarUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  twitterUrl?: string;
  skills: string[];
  interests: string[];
  experience: number;
  education?: string;
  certifications: string[];
  languages: string[];
  timezone?: string;
  availability?: string;
  resumeUrl?: string;
}

const PersonalInfo: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfoData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPersonalInfo = async () => {
      try {
        const response = await fetch('/api/personal');
        if (!response.ok) {
          throw new Error('Failed to fetch personal information');
        }
        const data = await response.json();
        setPersonalInfo(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalInfo();
  }, []);

  if (loading) {
    return (
      <LoadingMessage>
        <div>Loading personal information...</div>
      </LoadingMessage>
    );
  }

  if (error) {
    return (
      <ErrorMessage>
        <div>Error: {error}</div>
      </ErrorMessage>
    );
  }

  if (!personalInfo) {
    return (
      <ErrorMessage>
        <div>No personal information found</div>
      </ErrorMessage>
    );
  }

  return (
    <PersonalInfoContainer>
      <Container>
        <PersonalInfoContent>
          <AvatarSection>
            {personalInfo.avatarUrl && (
              <Avatar src={personalInfo.avatarUrl} alt={personalInfo.name} />
            )}
            <Name>{personalInfo.name}</Name>
            <Title>{personalInfo.title}</Title>
            <Bio>{personalInfo.bio}</Bio>
            <SocialLinks>
              {personalInfo.githubUrl && (
                <SocialLink href={personalInfo.githubUrl} target="_blank" rel="noopener noreferrer">
                  GitHub
                </SocialLink>
              )}
              {personalInfo.linkedinUrl && (
                <SocialLink href={personalInfo.linkedinUrl} target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </SocialLink>
              )}
              {personalInfo.twitterUrl && (
                <SocialLink href={personalInfo.twitterUrl} target="_blank" rel="noopener noreferrer">
                  Twitter
                </SocialLink>
              )}
              {personalInfo.website && (
                <SocialLink href={personalInfo.website} target="_blank" rel="noopener noreferrer">
                  Website
                </SocialLink>
              )}
            </SocialLinks>
          </AvatarSection>

          <InfoSection>
            <InfoCard>
              <InfoTitle>Contact Information</InfoTitle>
              <InfoList>
                <InfoItem>📧 {personalInfo.email}</InfoItem>
                {personalInfo.phone && <InfoItem>📞 {personalInfo.phone}</InfoItem>}
                {personalInfo.location && <InfoItem>📍 {personalInfo.location}</InfoItem>}
                {personalInfo.timezone && <InfoItem>🕐 {personalInfo.timezone}</InfoItem>}
              </InfoList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Experience & Education</InfoTitle>
              <InfoList>
                <InfoItem>💼 {personalInfo.experience} years experience</InfoItem>
                {personalInfo.education && <InfoItem>🎓 {personalInfo.education}</InfoItem>}
                {personalInfo.availability && <InfoItem>✅ {personalInfo.availability}</InfoItem>}
              </InfoList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Skills</InfoTitle>
              <div>
                {personalInfo.skills.map((skill, index) => (
                  <SkillTag key={index}>{skill}</SkillTag>
                ))}
              </div>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Interests</InfoTitle>
              <div>
                {personalInfo.interests.map((interest, index) => (
                  <SkillTag key={index}>{interest}</SkillTag>
                ))}
              </div>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Certifications</InfoTitle>
              <InfoList>
                {personalInfo.certifications.map((cert, index) => (
                  <InfoItem key={index}>🏆 {cert}</InfoItem>
                ))}
              </InfoList>
            </InfoCard>

            <InfoCard>
              <InfoTitle>Languages</InfoTitle>
              <InfoList>
                {personalInfo.languages.map((language, index) => (
                  <InfoItem key={index}>🗣️ {language}</InfoItem>
                ))}
              </InfoList>
            </InfoCard>
          </InfoSection>
        </PersonalInfoContent>
      </Container>
    </PersonalInfoContainer>
  );
};

export default PersonalInfo;
