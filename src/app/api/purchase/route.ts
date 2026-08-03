import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, contactMethod, contactId, totals, selections } = body

    // Security Input Validation
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return NextResponse.json({ success: false, error: 'Invalid name payload. Must be a non-empty string under 100 characters.' }, { status: 400 })
    }

    if (!email || typeof email !== 'string' || email.trim().length === 0 || email.length > 100) {
      return NextResponse.json({ success: false, error: 'Invalid email payload.' }, { status: 400 })
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address format.' }, { status: 400 })
    }

    if (!contactMethod || typeof contactMethod !== 'string' || contactMethod.length > 50) {
      return NextResponse.json({ success: false, error: 'Invalid contact method.' }, { status: 400 })
    }

    if (!contactId || typeof contactId !== 'string' || contactId.trim().length === 0 || contactId.length > 100) {
      return NextResponse.json({ success: false, error: 'Invalid contact ID payload.' }, { status: 400 })
    }

    // 1. Log to server console so you can see submissions in your terminal logs instantly
    console.log('====================================')
    console.log('🎉 NEW KCALC PURCHASE REQUEST RECEIVED')
    console.log('====================================')
    console.log(`Name:        ${name}`)
    console.log(`Email:       ${email}`)
    console.log(`Contact:     ${contactMethod} (${contactId})`)
    console.log(`Potential Savings: ${totals?.potentialSavings ? Math.round(totals.potentialSavings).toLocaleString() : 'N/A'} KRW`)
    console.log(`Total Runway:      ${totals?.totalBudgetRequired ? Math.round(totals.totalBudgetRequired).toLocaleString() : 'N/A'} KRW`)
    console.log(`Duration:          ${selections?.duration} months (${selections?.lifestylePlan})`)
    console.log(`Housing Choice:    ${selections?.housingType}`)
    console.log('====================================')

    // 2. Optional: Forward to Google Form if configured in environment variables
    const googleFormUrl = process.env.GOOGLE_FORM_URL;
    if (googleFormUrl) {
      try {
        const formData = new URLSearchParams();
        // Map to Google Form entry IDs (e.g. entry.123456789)
        // These can be configured in your environment variables
        formData.append(process.env.GOOGLE_FORM_ENTRY_NAME || 'entry.1000001', name);
        formData.append(process.env.GOOGLE_FORM_ENTRY_EMAIL || 'entry.1000002', email);
        formData.append(process.env.GOOGLE_FORM_ENTRY_CONTACT_METHOD || 'entry.1000003', contactMethod);
        formData.append(process.env.GOOGLE_FORM_ENTRY_CONTACT_ID || 'entry.1000004', contactId);
        
        const detailsSummary = `Savings: ${totals?.potentialSavings?.toLocaleString()} KRW | Total Runway: ${totals?.totalBudgetRequired?.toLocaleString()} KRW | Selections: ${selections?.duration}mo, ${selections?.lifestylePlan}, ${selections?.housingType}`;
        formData.append(process.env.GOOGLE_FORM_ENTRY_DETAILS || 'entry.1000005', detailsSummary);

        await fetch(googleFormUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: formData.toString()
        });
      } catch (err) {
        console.error('Failed to submit to Google Form:', err);
      }
    }

    // 3. Optional: Forward to Slack or Discord Webhook if configured in environment variables
    const webhookUrl = process.env.SLACK_WEBHOOK_URL || process.env.DISCORD_WEBHOOK_URL
    if (webhookUrl) {
      const isDiscord = webhookUrl.includes('discord.com')
      
      const payload = isDiscord 
        ? {
            username: 'KCalc Leads',
            embeds: [{
              title: '🎉 New Relocation Package Request!',
              color: 65280, // Green
              fields: [
                { name: 'Name', value: name, inline: true },
                { name: 'Email', value: email, inline: true },
                { name: 'Contact Info', value: `${contactMethod}: ${contactId}`, inline: true },
                { name: 'Duration', value: `${selections?.duration} months`, inline: true },
                { name: 'Lifestyle', value: selections?.lifestylePlan, inline: true },
                { name: 'Potential Savings', value: `${totals?.potentialSavings?.toLocaleString()} KRW`, inline: true },
                { name: 'Total Budget', value: `${totals?.totalBudgetRequired?.toLocaleString()} KRW`, inline: true }
              ],
              timestamp: new Date().toISOString()
            }]
          }
        : {
            text: `*🎉 New KCalc Purchase Request!*\n*Name:* ${name}\n*Email:* ${email}\n*Contact:* ${contactMethod} (${contactId})\n*Potential Savings:* ${totals?.potentialSavings?.toLocaleString()} KRW\n*Total Runway Required:* ${totals?.totalBudgetRequired?.toLocaleString()} KRW`
          }

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
    }

    return NextResponse.json({ success: true, message: 'Lead captured successfully' })
  } catch (error) {
    console.error('Error handling purchase request:', error)
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 })
  }
}
