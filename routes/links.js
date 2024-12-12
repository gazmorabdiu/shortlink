const express = require('express');
const ShortLink = require("../database/models/shortLink");

const router = express.Router();


router.get('/', (req, res) => {
    // Example data to pass to the EJS template
    const title = "URL Shortener";
    const description = "Paste a URL to shorten it and manage expiration options.";
    const urls = [
        { originalUrl: "http://example.com", shortUrl: "http://short.ly/abc123" },
        { originalUrl: "http://another-url.com", shortUrl: "http://short.ly/xyz456" }
    ];

    // Render the 'index' EJS template and pass data
    res.render('index', { title, description, urls });
});


router.get('/links',async (req,res)=>{
    try {
        const allLinks = await ShortLink.find({
          expiresIn: { $gte: new Date() }
        }).exec();
    
        res.status(200).json({
          data: allLinks,
        });
      } catch (error) {
        console.error('Error fetching sidebar data:', error);
        res.status(500).json({
          message: 'Server Error. Could not fetch data.',
        });
      }
})


router.post("/links/create",async (req,res)=>{

    try {

        const { linkName, shortLink, expiresIn } = req.body;
        const shortLinkExist = await ShortLink.findOne({linkName})
        if(shortLinkExist){
            if(shortLinkExist.expiresIn >= new Date()){
                return res.status(200).json({ message: 'Short link Exists and is still active', data: shortLinkExist });

            }else{
                await ShortLink.deleteOne({linkName})
            }
            

        }
  
        const newShortLink = new ShortLink({
          linkName,
          shortLink,
          expiresIn
        });
    
        await newShortLink.save();
        res.status(201).json({ message: 'Short link created', data: newShortLink });
      } catch (err) {
        console.error('Error creating short link:', err.message);
        res.status(500).json({ message: 'Server error' });
      }

})

router.delete("/links/:id",async (req,res)=>{
    const {id} = req.params;

    try {
        const deletedLink = await ShortLink.findByIdAndDelete(id).exec();
      
        if (!deletedLink) {
          return res.status(404).json({
            message: 'Document not found.',
          });
        }
      
        res.status(200).json({
          message: 'Document deleted successfully',
          data: deletedLink,
        });
      } catch (error) {
        console.error('Error deleting document:', error);
        res.status(500).json({
          message: 'Server Error. Could not delete document.',
        });
      }

})


router.get('/short.co/:shortLink',async (req,res)=>{
    const {shortLink} = req.params;

  try {
    // Find the link by shortLink
    const link = await ShortLink.findOne({ shortLink });

    if (!link) {
      return res.status(404).send('Link not found');
    }
    if(link.expiresIn < new Date()){
        return res.status(404).send('Link expired');

    }

    // Increment the click count
    link.clickCount += 1;
    await link.save();

    // Redirect to the original URL
    return res.redirect(link.linkName);
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server error');
  }
})



module.exports = router;
