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
import { BackButton, InlineBackButton } from '../story/Stories.style';
import { useNavigate } from 'react-router-dom';

const AboutPage: React.FC = () => {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const navigate = useNavigate();

  const team = [
    {
      name: 'Alexis Searle',
      role: 'Founder & Chief Steward of the Movement',
      bio: `Alexis has spent more than two decades shaping brand and communication strategy across Africa’s leading organisations. As a GBV survivor, she founded The I AM Collective with a clear belief: when individuals learn to name, understand, and heal their experiences, entire communities shift.
  
  Her work blends strategic insight, deep empathy, and an unwavering commitment to restoring dignity. Alexis is devoted to turning the voices of many into a learning ecosystem that helps people reclaim their sovereignty, reconnect with their wholeness, and choose safer, healthier ways of living.
  
  She leads the vision, movement strategy and ecosystem partnerships that ensure every story shared becomes an opportunity for collective healing and action. “When we heal the individual, we heal the collective. When we awaken the collective, we ignite change.”`,
      image: '/team/AlexisSearle.png',
      color: '#FFB4A2',
    },
    {
      name: 'Dr. Rafiek Lokhat',
      role: 'Clinical Psychologist & Clinical Lead',
      bio: `Dr Rafiek Lokhat brings more than 30 years of clinical experience to The I AM Collective. His work spans psychiatric hospitals, community upliftment programmes, media education, and the training of nearly 2,000 mental health professionals across South Africa.
  
  As CEO and Master Trainer of BWRT® South Africa, Dr Lokhat specialises in trauma-informed, accessible mental health approaches. His deep understanding of human behaviour, trauma, and healing guides how user stories on the platform are decoded, translated and transformed into safe, meaningful learning.
  
  A respected voice in both clinical and public spaces, he is committed to creating mental-health-literate communities and ensuring the platform upholds the highest ethical and psychological standards.`,
      image: '/team/DrLokhat.png',
      color: '#A8D8EA',
    },
    {
      name: 'Dee',
      role: 'Learning Architect & Eduvator',
      bio: `Dee is an experienced learning strategist dedicated to making education accessible, inclusive and socially just. With a background spanning academic research, learning design, and online higher education, she specialises in turning complex ideas into meaningful, human-centred learning experiences.
  
  Through EdXimia, her digital learning consultancy, Dee leads the design and development of the I AM Collective’s learning architecture and micro-learning library. Her work ensures that every story-derived insight becomes practical, compassionate and empowering learning that supports personal growth and community healing.`,
      image: '/team/Dee.png',
      color: '#FFCDB2',
    },
    {
      name: 'Zachary',
      role: 'Social Media Editor & Story Steward',
      bio: `Zachary ensures that every digital touchpoint of the I AM Collective feels safe, human and held with care. He curates and communicates the stories shared by the community with compassion and responsibility, ensuring that all voices are treated with dignity.
  
  He brings a calm, thoughtful approach to creating online spaces where people feel seen, understood and less alone. Every post and every conversation is shaped by his belief that learning can spark healing, and that shared stories can help build safer communities across Africa—one person at a time.`,
      image: '/team/Zachary.png',
      color: '#D1C4E9',
    },
    {
      name: 'Dr. Xena Cupido',
      role: 'Social Scientist & Systems Research Lead',
      bio: `Dr Xena Cupido is a higher-education specialist whose work focuses on building socially just, accountable and caring institutional environments. With expertise in academic development and GBV risk within complex systems, she helps the I AM Collective understand how violence shows up in communities—and how prevention and accountability can be strengthened.
  
  Her research-driven approach ensures that story insights are grounded in evidence and translated into learning that supports systemic change, not just individual awareness.`,
      image: '/team/DrXena.png',
      color: '#B2EBF2',
    },
    {
      name: 'Samantha Africa',
      role: 'Partnership Strategy Lead',
      bio: `Samantha brings 15 years of partnership and stakeholder-engagement experience, guided by a deep belief in the power of storytelling and collaboration. She works to build relationships that expand the impact of The I AM Collective and unlock pathways for healing, awareness and community empowerment.
  
  Her role focuses on connecting the movement with organisations, funders, and platforms that share its vision for transforming the way Africa understands and responds to GBV.`,
      image: '/team/samantha.png',
      color: '#FFE082',
    },
    {
      name: 'Saskia Falken',
      role: 'Content & Radio Strategist',
      bio: `Saskia is an award-winning broadcaster and marketer with more than 20 years’ experience shaping content, brand and media strategy for respected institutions including Daily Maverick, Kfm 94.5, CapeTalk and Heart FM.
  
  With an MBA from the UCT Graduate School of Business and training in Brené Brown’s Dare to Lead™, she blends strategic clarity with human-centred leadership. Saskia leads the Collective’s radio strategy, ensuring insights from real stories become powerful, accessible content that reaches millions across the continent.
  
  Her work bridges media, empathy and community impact, making her a vital voice in amplifying the movement.`,
      image: '/team/saskia.png',
      color: '#FFCCBC',
    },
  ];

  return (
    <PageWrapper>
      <InlineBackButton>
        <BackButton onClick={() => navigate(-1)}>← Back</BackButton>
      </InlineBackButton>
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
