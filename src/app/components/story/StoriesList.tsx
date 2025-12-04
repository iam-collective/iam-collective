import React from 'react';
import { CardGrid } from '../micro-lessons/Cards.styles';
import * as S from './Stories.style';
import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { Id } from '../../../../convex/_generated/dataModel';
import { truncateText } from '../../utils/stories-util';
import { getUserFromStorage } from '../../utils/storage';
import * as XLSX from 'xlsx';

type StoriesQueryType = {
  username?: string;
  email?: string;
  imageUrl: string | null;
  _id: Id<'stories'>;
  _creationTime: number;
  imageId?: Id<'_storage'>;
  isPublic?: boolean;
  createdAt: number;
  userId: string;
  title: string;
  content: string;
};

type StoriesListProp = {
  stories: StoriesQueryType[];
};

const StoriesList: React.FC<StoriesListProp> = ({ stories }) => {
  const currentUser = getUserFromStorage();

  const AUTHORIZED_EMAILS = ['cindi@gmail.com'];

  const canDownload = AUTHORIZED_EMAILS.includes(currentUser?.email?.toLowerCase() || '');

  const downloadExcel = () => {
    const timestamp = new Date().toISOString();

    const instructions = [
      ['CONFIDENTIAL - STORIES REVIEW FORM'],
      [''],
      ['INSTRUCTIONS:'],
      ['1. This document contains sensitive user information'],
      ['2. Only the "Feedback" column (Column F) should be edited'],
      ['3. Do NOT modify columns A, B, C, D, or E (Row, ID, Email, Title, Content)'],
      ['4. Please treat all information as confidential'],
      ['5. After completing feedback, save and return this file securely'],
      [''],
      ['Downloaded by: ' + (currentUser?.name || currentUser?.email || 'Unknown')],
      ['Downloaded on: ' + new Date().toLocaleString()],
      [''],
      ['--- STORIES DATA BELOW ---'],
    ];

    const storiesData = stories.map((story, index) => ({
      Row: index + 1,
      '_id (READ ONLY)': story._id,
      'Email (READ ONLY)': story.email || story.username || 'N/A',
      'Title (READ ONLY)': story.title,
      'Content (READ ONLY)': story.content,
      '>>> Feedback - EDITABLE <<<': '',
    }));

    const wsInstructions = XLSX.utils.aoa_to_sheet(instructions);
    wsInstructions['!cols'] = [{ wch: 80 }];

    const wsStories = XLSX.utils.json_to_sheet(storiesData);

    wsStories['!cols'] = [
      { wch: 8 }, // Row number
      { wch: 25 }, // _id column
      { wch: 30 }, // Email column
      { wch: 30 }, // Title column
      { wch: 60 }, // Content column
      { wch: 45 }, // Feedback column
    ];

    const range = XLSX.utils.decode_range(wsStories['!ref'] || 'A1');

    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });

        if (!wsStories[cellAddress]) continue;

        if (!wsStories[cellAddress].s) wsStories[cellAddress].s = {};

        wsStories[cellAddress].s.alignment = {
          wrapText: true,
          vertical: 'top',
        };
      }
    }

    const wb = XLSX.utils.book_new();

    XLSX.utils.book_append_sheet(wb, wsInstructions, 'INSTRUCTIONS - READ FIRST');
    XLSX.utils.book_append_sheet(wb, wsStories, 'Stories & Feedback');

    const filename = `Stories_Feedback_${new Date().toISOString().split('T')[0]}_${Date.now()}.xlsx`;

    XLSX.writeFile(wb, filename);
  };

  if (!stories) return null;

  return (
    <>
      <S.Container>
        <S.SuggestedTitle>Recent Stories</S.SuggestedTitle>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
          <S.MyStories to={'my-stories'}>My Stories</S.MyStories>
          {canDownload && <S.MyStories onClick={downloadExcel}>Download Stories</S.MyStories>}
        </div>
      </S.Container>
      <CardGrid>
        {stories.map((story) => (
          <S.StyledCard key={story._id}>
            <S.Username>{story.username}</S.Username>
            <S.Date>{new Date(story.createdAt).toLocaleString()}</S.Date>
            <S.Title to={`${story._id}`}>{story.title}</S.Title>
            <S.Content>{truncateText(story.content, 20)}</S.Content>

            {story.imageUrl && <S.StyledCardImage src={story.imageUrl} alt={story.title} />}
            <S.Wrapper>
              <S.ReadMore to={`${story._id}`}>Read More</S.ReadMore>
            </S.Wrapper>
          </S.StyledCard>
        ))}
      </CardGrid>
    </>
  );
};

export default StoriesList;
