import React, { useState } from 'react';
import {
  WordHighlight,
  Bio,
  CardContent,
  CardGlow,
  ContentCard,
  FounderQuote,
  HighlightCard,
  ImageOverlay,
  ImageWrapper,
  InteractiveCorner,
  LogoWrapper,
  Name,
  PageWrapper,
  QuoteIcon,
  QuoteText,
  Role,
  Section,
  TeamCard,
  TeamGrid,
  Title,
  TitleAccent,
  TitleWrapper,
  FeatureGrid,
  FeatureIcon,
  FeatureItem,
  FeatureText,
  HeroSection,
  HeroSubtitle,
  HeroTitle,
  ServiceCard,
  ServiceDescription,
  ServiceEmoji,
  ServiceIconWrapper,
  ServicesGrid,
  ServiceTitle,
  ProcessCard,
  ProcessDescription,
  ProcessEmoji,
  ProcessGrid,
  ProcessIconWrapper,
  ProcessList,
  ProcessListItem,
  ProcessNumber,
  ProcessTitle,
} from './AboutPage.styles';
import { Logo } from '../landing-page/LandingPage.styles';

const AboutPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  const team = [
    {
      name: 'Founder',
      role: 'Founder',
      bio: 'Passionate about healing, learning, and building tools that help people grow.',
      image: '/I-am-safe-place-image.png',
      color: '#FFB4A2',
    },
    {
      name: 'Team Member 2',
      role: 'Role',
      bio: 'Short bio goes here. This is a placeholder for the MVP.',
      image: '/I-am-safe-place-image.png',
      color: '#A8D8EA',
    },
    {
      name: 'Team Member 3',
      role: 'Role',
      bio: 'Short bio goes here. This is a placeholder for the MVP.',
      image: '/I-am-safe-place-image.png',
      color: '#FFCDB2',
    },
  ];

  return (
    <PageWrapper>
      <LogoWrapper>
        <Logo src='/Header-Logo.png' alt='IAMCOLLECTIVE Logo' />
      </LogoWrapper>

      <HeroSection>
        <HeroTitle>About Us</HeroTitle>
        <HeroSubtitle>
          The <WordHighlight>I AM Collective</WordHighlight> is a healing movement and digital
          community created to support anyone affected by gender-based violence (GBV) across Africa.
          We use technology, storytelling and learning to help people recognise abuse, heal from it,
          and change how we show up in our homes, workplaces and online spaces.
        </HeroSubtitle>
      </HeroSection>

      <Section>
        <TitleWrapper>
          <Title>What We Believe</Title>
          <TitleAccent />
        </TitleWrapper>
        <ContentCard>
          <FeatureGrid>
            <FeatureItem>
              <FeatureIcon>🦋</FeatureIcon>
              <FeatureText>
                <span>When one person heals, we all move.</span>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>💬</FeatureIcon>
              <FeatureText>
                <span>When we change the conversation, we change behaviour</span>
              </FeatureText>
            </FeatureItem>
            <FeatureItem>
              <FeatureIcon>🏘️</FeatureIcon>
              <FeatureText>
                <span> When we speak up, connect and heal, we create safer communities.</span>
              </FeatureText>
            </FeatureItem>
          </FeatureGrid>
        </ContentCard>
      </Section>

      <Section>
        <TitleWrapper>
          <Title>What We Do</Title>
          <TitleAccent />
        </TitleWrapper>
        <ProcessGrid>
          <ProcessCard>
            <ProcessNumber $color='#A8D8EA'>1</ProcessNumber>
            <ProcessIconWrapper $color='#A8D8EA'>
              <ProcessEmoji>👂</ProcessEmoji>
            </ProcessIconWrapper>
            <ProcessTitle>We Listen to Your Story</ProcessTitle>
            <ProcessDescription>
              Members can share their lived experiences of harm or abuse — in the home, online, at
              work or in the community. Stories can be shared anonymously, and we guide members to
              remove identifying details.
            </ProcessDescription>
          </ProcessCard>

          <ProcessCard>
            <ProcessNumber $color='#FFB4A2'>2</ProcessNumber>
            <ProcessIconWrapper $color='#FFB4A2'>
              <ProcessEmoji>📖</ProcessEmoji>
            </ProcessIconWrapper>
            <ProcessTitle>We Turn Stories into Learning</ProcessTitle>
            <ProcessDescription>
              Trauma-informed practitioners and subject-matter experts unpack these stories in
              longer conversations such as vlogs, podcasts or written reflections. From there, we
              create:
            </ProcessDescription>
            <ProcessList>
              <ProcessListItem>Byte-sized learning for mobile and social media</ProcessListItem>
              <ProcessListItem>
                Deeper learning journeys that support reflection, self-awareness and healing
              </ProcessListItem>
            </ProcessList>
          </ProcessCard>

          <ProcessCard>
            <ProcessNumber $color='#FFCDB2'>3</ProcessNumber>
            <ProcessIconWrapper $color='#FFCDB2'>
              <ProcessEmoji>🧩</ProcessEmoji>
            </ProcessIconWrapper>
            <ProcessTitle>We Build a Community Knowledge Base</ProcessTitle>
            <ProcessDescription>
              Across all stories and responses, we begin to see patterns: where people are
              struggling, what kinds of abuse are common, and what support is missing. This helps
              guide better conversations, resources and interventions.
            </ProcessDescription>
          </ProcessCard>

          <ProcessCard>
            <ProcessNumber $color='#2E86AB'>4</ProcessNumber>
            <ProcessIconWrapper $color='#2E86AB'>
              <ProcessEmoji>🌍</ProcessEmoji>
            </ProcessIconWrapper>
            <ProcessTitle>We Create Access at Scale</ProcessTitle>
            <ProcessDescription>
              Through partnerships with radio, workplaces and community organisations, we bring
              these conversations and tools to more people across Africa.
            </ProcessDescription>
          </ProcessCard>
        </ProcessGrid>
      </Section>

      <Section>
        <TitleWrapper>
          <Title>The Back Story – Our Founder</Title>
          <TitleAccent />
        </TitleWrapper>
        <ContentCard>
          <p>
            The <WordHighlight>I AM Collective</WordHighlight> was founded by Alexis Searle, a
            pan-African brand and transformation leader, somatic practitioner and trauma-informed
            coach. After more than two decades working in major African organisations, she saw how
            unhealed trauma and violence kept showing up — at home, at work, and in the digital
            space.
          </p>
          <p>
            Alexis created The I AM Collective as a bridge between healing and everyday life. The
            platform is rooted in somatic healing, trauma-informed practice and conscious business,
            with a clear mission:
          </p>
          <ul>
            <li>
              To reduce GBV across Africa by helping individuals become safe spaces for themselves
              and others.
            </li>
          </ul>

          <FounderQuote>
            <QuoteIcon>"</QuoteIcon>
            <QuoteText>
              When we heal the individual, we shift the collective. When we remember who we are
              beyond trauma, we change what we accept and what we allow.
            </QuoteText>
            <QuoteIcon>"</QuoteIcon>
          </FounderQuote>
        </ContentCard>
      </Section>

      <Section>
        <TitleWrapper>
          <Title>Meet the Team</Title>
          <TitleAccent />
        </TitleWrapper>
        <ContentCard>
          <p>
            The <WordHighlight>I AM Collective</WordHighlight> is held by a multi-disciplinary team
            of:
          </p>
          <ul>
            <li>
              Storytellers and creatives who translate lived experiences into learning content.
            </li>
            <li>
              Psychologists and trauma-informed practitioners who ensure that our content is safe,
              ethical and grounded.
            </li>
            <li>
              Technologists and data stewards who help us understand patterns and protect member
            </li>
            <li>
              Community and partnership leads who work with workplaces, radio stations and community
              groups to reach more people
            </li>
            <li>Youth and survivor voices who keep the work rooted in lived reality.</li>
          </ul>
        </ContentCard>

        <TeamGrid>
          {team.map((member, index) => (
            <TeamCard
              key={member.name}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              $isHovered={hoveredCard === index}
              $color={member.color}
            >
              <CardGlow $color={member.color} $isHovered={hoveredCard === index} />
              <ImageWrapper $isHovered={hoveredCard === index}>
                <img src={member.image} alt={member.name} />
                <ImageOverlay $isHovered={hoveredCard === index} $color={member.color} />
              </ImageWrapper>
              <CardContent>
                <Name>{member.name}</Name>
                <Role>{member.role}</Role>
                {member.bio && <Bio $isHovered={hoveredCard === index}>{member.bio}</Bio>}
              </CardContent>
              <InteractiveCorner $color={member.color} />
            </TeamCard>
          ))}
        </TeamGrid>
      </Section>

      <Section>
        <TitleWrapper>
          <Title>Why It Matters</Title>
          <TitleAccent />
        </TitleWrapper>
        <HighlightCard>
          <p>
            Across Africa, GBV statistics are alarming and often overwhelming. Many people feel
            powerless when they see the numbers. The <WordHighlight>I AM Collective</WordHighlight>{' '}
            exists to change that feeling — from helplessness to meaningful action.
          </p>
          <p>
            <strong>We help people move from:</strong>
          </p>
          <ul>
            <li>Awareness to accountability and responsibility.</li>
            <li> Reaction to prevention.</li>
          </ul>
          <p>
            By learning what abuse looks like, reflecting on our own behaviour, and supporting one
            another, we begin to change the systems and cultures that allow GBV to continue.
          </p>
        </HighlightCard>
      </Section>
    </PageWrapper>
  );
};

export default AboutPage;
