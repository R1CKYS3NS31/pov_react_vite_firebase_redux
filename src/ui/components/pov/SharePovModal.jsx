import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Box,
  Typography,
  IconButton,
  Tooltip,
} from '@mui/material';
import TwitterIcon from '@mui/icons-material/Twitter';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const SharePovModal = ({ open, handleClose, pov }) => {
  const [copied, setCopied] = useState(false);

  if (!pov) return null;

  const shareUrl = `${window.location.origin}/pov/${pov.id}`;
  const shareText = `Check out this POV by ${pov.author?.name || 'someone'}: "${pov.title}"`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { borderRadius: 3, border: 'none', maxWidth: 400, width: '100%' },
        },
      }}
    >
      <DialogTitle sx={{ fontWeight: 800, color: 'text.primary', pb: 1 }}>
        Share POV
      </DialogTitle>
      <DialogContent>
        <DialogContentText sx={{ color: 'text.secondary', mb: 3 }}>
          Share this unique perspective with your network.
        </DialogContentText>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 3 }}>
          <Tooltip title="Share on Twitter">
            <IconButton
              component="a"
              href={shareLinks.twitter}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ bgcolor: '#1DA1F2', color: 'white', '&:hover': { bgcolor: '#1a91da' } }}
            >
              <TwitterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on WhatsApp">
            <IconButton
              component="a"
              href={shareLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ bgcolor: '#25D366', color: 'white', '&:hover': { bgcolor: '#20bd5a' } }}
            >
              <WhatsAppIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share on LinkedIn">
            <IconButton
              component="a"
              href={shareLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              sx={{ bgcolor: '#0077B5', color: 'white', '&:hover': { bgcolor: '#006699' } }}
            >
              <LinkedInIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: 'action.hover',
            p: 1.5,
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider'
          }}
        >
          <Typography
            variant="body2"
            sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', pr: 2 }}
          >
            {shareUrl}
          </Typography>
          <Button
            size="small"
            variant={copied ? "contained" : "outlined"}
            color={copied ? "success" : "primary"}
            startIcon={copied ? <CheckCircleIcon /> : <ContentCopyIcon />}
            onClick={handleCopy}
            sx={{ borderRadius: 2, fontWeight: 700, minWidth: 90 }}
          >
            {copied ? 'Copied' : 'Copy'}
          </Button>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={handleClose} color="inherit" sx={{ borderRadius: 2, fontWeight: 700 }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SharePovModal;
