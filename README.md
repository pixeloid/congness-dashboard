# Congness Dashboard

Modern conference and event management dashboard built with React, featuring:

- Drag & drop schedule management
- Multi-track support
- Template-based event planning
- Real-time timeline calculations
- Responsive bento-style UI

## Tech Stack

- React
- Vite
- Tailwind CSS
- DND Kit
- Date FNS

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Testing Review System

Use these accounts to test different review functionalities:

### Scientific Reviewers

1. Login as Scientific Reviewer 1:

   - Email: szabo.anna@example.com
   - Can review abstracts before deadline
   - Cannot make final decisions

2. Login as Scientific Reviewer 2:
   - Email: kiss.marta@example.com
   - Can review abstracts before deadline
   - Cannot make final decisions

### Chief Reviewer

Login as Chief Reviewer:

- Email: kovacs.peter@example.com
- Can review abstracts before deadline
- Can make final decisions only after deadline

### Test Cases

1. Abstract #1 (Active Review Period):

   - Review deadline: Future date
   - Scientific reviewers can submit reviews
   - Chief reviewer cannot make final decision yet

2. Abstract #2 (Review Period Ended):
   - Review deadline: Past date
   - Scientific reviewers cannot submit new reviews
   - Chief reviewer can make final decision

### Testing Steps

1. Test Scientific Reviewer Flow:

   - Login as Scientific Reviewer 1
   - Navigate to Abstracts
   - Try reviewing Abstract #1 (should work)
   - Try reviewing Abstract #2 (should be disabled)

2. Test Chief Reviewer Flow:

   - Login as Chief Reviewer
   - Navigate to Abstracts
   - Verify Abstract #1 shows "waiting for deadline"
   - Verify Abstract #2 shows final decision options

3. Test Multiple Reviews:
   - Login as different reviewers
   - Submit multiple reviews
   - Verify chief reviewer can only decide after deadline

## License

Private repository - All rights reserved
