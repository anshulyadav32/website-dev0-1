const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get personal information
router.get('/', async (req, res) => {
  try {
    const personalInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true }
    });
    
    if (!personalInfo) {
      return res.status(404).json({ error: 'Personal information not found' });
    }
    
    res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ error: 'Failed to fetch personal information' });
  }
});

// Get personal information by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const personalInfo = await prisma.personalInfo.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!personalInfo) {
      return res.status(404).json({ error: 'Personal information not found' });
    }
    
    res.json(personalInfo);
  } catch (error) {
    console.error('Error fetching personal info:', error);
    res.status(500).json({ error: 'Failed to fetch personal information' });
  }
});

// Create or update personal information
router.post('/', async (req, res) => {
  try {
    const {
      name,
      title,
      bio,
      email,
      phone,
      location,
      website,
      avatarUrl,
      githubUrl,
      linkedinUrl,
      twitterUrl,
      skills,
      interests,
      experience,
      education,
      certifications,
      languages,
      timezone,
      availability,
      resumeUrl
    } = req.body;

    // Check if personal info already exists
    const existingInfo = await prisma.personalInfo.findFirst({
      where: { isActive: true }
    });

    let personalInfo;
    if (existingInfo) {
      // Update existing personal info
      personalInfo = await prisma.personalInfo.update({
        where: { id: existingInfo.id },
        data: {
          name,
          title,
          bio,
          email,
          phone,
          location,
          website,
          avatarUrl,
          githubUrl,
          linkedinUrl,
          twitterUrl,
          skills: skills || [],
          interests: interests || [],
          experience: experience || 0,
          education,
          certifications: certifications || [],
          languages: languages || [],
          timezone,
          availability,
          resumeUrl
        }
      });
    } else {
      // Create new personal info
      personalInfo = await prisma.personalInfo.create({
        data: {
          name,
          title,
          bio,
          email,
          phone,
          location,
          website,
          avatarUrl,
          githubUrl,
          linkedinUrl,
          twitterUrl,
          skills: skills || [],
          interests: interests || [],
          experience: experience || 0,
          education,
          certifications: certifications || [],
          languages: languages || [],
          timezone,
          availability,
          resumeUrl
        }
      });
    }

    res.json(personalInfo);
  } catch (error) {
    console.error('Error creating/updating personal info:', error);
    res.status(500).json({ error: 'Failed to create/update personal information' });
  }
});

// Update personal information
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const personalInfo = await prisma.personalInfo.update({
      where: { id: parseInt(id) },
      data: updateData
    });

    res.json(personalInfo);
  } catch (error) {
    console.error('Error updating personal info:', error);
    res.status(500).json({ error: 'Failed to update personal information' });
  }
});

// Delete personal information
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.personalInfo.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Personal information deleted successfully' });
  } catch (error) {
    console.error('Error deleting personal info:', error);
    res.status(500).json({ error: 'Failed to delete personal information' });
  }
});

module.exports = router;
