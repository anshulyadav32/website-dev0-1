const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();

// Get all repositories
router.get('/', async (req, res) => {
  try {
    const repositories = await prisma.repository.findMany({
      orderBy: {
        stars: 'desc'
      }
    });
    res.json(repositories);
  } catch (error) {
    console.error('Error fetching repositories:', error);
    res.status(500).json({ error: 'Failed to fetch repositories' });
  }
});

// Get repository by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const repository = await prisma.repository.findUnique({
      where: { id: parseInt(id) }
    });
    
    if (!repository) {
      return res.status(404).json({ error: 'Repository not found' });
    }
    
    res.json(repository);
  } catch (error) {
    console.error('Error fetching repository:', error);
    res.status(500).json({ error: 'Failed to fetch repository' });
  }
});

// Create or update repository
router.post('/', async (req, res) => {
  try {
    const {
      name,
      fullName,
      description,
      htmlUrl,
      cloneUrl,
      language,
      stars,
      forks,
      watchers,
      openIssues,
      size,
      isPrivate,
      isFork,
      isArchived,
      topics,
      pushedAt,
      lastCommit
    } = req.body;

    // Check if repository already exists
    const existingRepo = await prisma.repository.findFirst({
      where: { fullName }
    });

    let repository;
    if (existingRepo) {
      // Update existing repository
      repository = await prisma.repository.update({
        where: { id: existingRepo.id },
        data: {
          name,
          fullName,
          description,
          htmlUrl,
          cloneUrl,
          language,
          stars: stars || 0,
          forks: forks || 0,
          watchers: watchers || 0,
          openIssues: openIssues || 0,
          size: size || 0,
          isPrivate: isPrivate || false,
          isFork: isFork || false,
          isArchived: isArchived || false,
          topics: topics || [],
          pushedAt: pushedAt ? new Date(pushedAt) : null,
          lastCommit
        }
      });
    } else {
      // Create new repository
      repository = await prisma.repository.create({
        data: {
          name,
          fullName,
          description,
          htmlUrl,
          cloneUrl,
          language,
          stars: stars || 0,
          forks: forks || 0,
          watchers: watchers || 0,
          openIssues: openIssues || 0,
          size: size || 0,
          isPrivate: isPrivate || false,
          isFork: isFork || false,
          isArchived: isArchived || false,
          topics: topics || [],
          pushedAt: pushedAt ? new Date(pushedAt) : null,
          lastCommit
        }
      });
    }

    res.json(repository);
  } catch (error) {
    console.error('Error creating/updating repository:', error);
    res.status(500).json({ error: 'Failed to create/update repository' });
  }
});

// Sync repositories from GitHub (placeholder for GitHub API integration)
router.post('/sync', async (req, res) => {
  try {
    // This would integrate with GitHub API to fetch user repositories
    // For now, we'll return a success message
    res.json({ message: 'Repository sync endpoint ready for GitHub API integration' });
  } catch (error) {
    console.error('Error syncing repositories:', error);
    res.status(500).json({ error: 'Failed to sync repositories' });
  }
});

// Delete repository
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.repository.delete({
      where: { id: parseInt(id) }
    });
    res.json({ message: 'Repository deleted successfully' });
  } catch (error) {
    console.error('Error deleting repository:', error);
    res.status(500).json({ error: 'Failed to delete repository' });
  }
});

module.exports = router;
