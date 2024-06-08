export function Content() {
  return (
    <>
      <h1>This is the H1 Heading</h1>
      <p>
        Above this paragraph should be the H1 heading for your web page. If it is not visible, the
        design settings for the H1 tag is set to <code>display:none</code> which many WordPress
        Themes use to hide the blog title text and replace it with a graphic. Do not use H1 within
        your blog post area.
      </p>
      <p>
        If the design in the H1 heading looks like your blog title or blog post title, then that is
        the style set for that HTML tag and you should not use it within your blog post area.
      </p>
      <p>
        Inside of this test data section are most of the basic HTML and XHTML and CSS styles that
        you might use within your WordPress Theme. You need to know what that will look like as part
        of structuring your styles.
      </p>
      <h2>This is the H2 Heading</h2>
      <p>
        Above this paragraph should be the H2 heading for your web page. WordPress Themes use the h2
        heading for various purposes. Logically, it should be either the post title or the first
        heading in the post content.
      </p>
      <p>
        However, it is used all over WordPress Themes including the subtitle, tag line, post title,
        comment area, sidebar area, and even in the footer. Be specific when styling each h2
        headings to ensure you are not styling all of them.
      </p>
      <h3>This is the H3 Heading</h3>
      <p>
        Is this the same heading as is in your post title or is this the section headings found
        within your sidebar? Or is it different? This is the post content heading for the HTML tag
        h3, as is the one below, H4, for section headings within your post to divide up topics. If
        there is an H3 or H4 tag in your sidebar, you will need to identify the parent HTML and CSS
        container for the sidebar and style those appropriate in your blog's stylesheet.
      </p>
      <p>
        For more information in searching for your styles in your WordPress blog, see
        <a
          title="CSS: Studying Your CSS Styles"
          href="http://codex.wordpress.org/Finding_Your_CSS_Styles"
        >
          CSS: Studying Your CSS Styles
        </a>
        .
      </p>
      <p>
        Also notice how the links in that paragraph are styled so you can style links within your
        post content area. Links have three styles. There is the
        <a title="nothing here" href="#">
          link color
        </a>
        ,
        <a title="nothing here" href="#">
          link hover color
        </a>
        , and
        <a title="nothing here" href="#">
          visited link color
        </a>
        . Be sure and design for each style.
      </p>
      <h4>This is the H4 Heading</h4>
      <p>
        In this section under the H4 heading, we’re going to look at what the post content, the meat
        and potatoes of your site looks like. In general, you will have multiple paragraphs, so we
        will add another paragraph so you can adjust the spacing in between them to the look you
        want.
      </p>
      <p>
        Paragraphs are not just for typing your blog babble, they can also hold frame and hold other
        information within your content area to help make the point you want to make in your
        writing. For instance, you will commonly have three types of lists.
      </p>
      <ul>
        <li>
          General Lists using the <code>&lt;ul&gt;</code> tag
        </li>
        <li>
          Ordered Lists using the <code>&lt;ol&gt;</code> tag
        </li>
        <li>
          Definition Lists using the <code>&lt;dl&gt;</code> tag
          <ul>
            <li>
              Definition Lists use two other tags to generate the list:
              <ul>
                <li>
                  <code>&lt;dt&gt;</code> sets up the word or phrase to be “defined”, usually set in
                  bold, and
                </li>
                <li>
                  <code>&lt;dd&gt;</code> sets up the definition, which is usually in a normal or
                  slightly smaller font and indented under the definition.
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li>And that’s the end of the lists</li>
      </ul>
      <p>
        And we’ve just tested a paragraph before and after a general list along with a nested list
        to help you see what at least three levels of the list will look like. Make sure that each
        level of the list is styled to match your specific needs. You might want to use the default
        disc or circle, or you might want to add graphic bullets to your list, too.
      </p>
      <h5>This is the H5 Heading</h5>
      <p>
        While the H5 heading is not always used, maybe you might find a need for it if your H1 and
        H2 and H3 headings are used. You might need one to two levels of subheadings in your post
        content, so this one gives you another option.
      </p>
      <p>
        We also need to look at the other two lists and then add some images and other styles to
        flesh out your WordPress Theme sandbox.
      </p>
      <ol>
        <li>You need to do this first.</li>
        <li>
          You need to do this second.
          <ul>
            <li>You could do this in between.</li>
            <li>Or give this a try, too.</li>
          </ul>
        </li>
        <li>But this is the third and last thing to do.</li>
      </ol>
      <p>
        This should give you an idea of how a nested number list would look on your site. Now, let’s
        look at a definition list.
      </p>
      <dl>
        <dt>WordPress Themes</dt>
        <dd>
          A WordPress Theme is not a “skin”. Though many young people call it one. The reality is
          that a WordPress Theme contains many files that come together in various ways to generate
          a WordPress web page. A “skin” simply changes the look, and rarely the results.
        </dd>
        <dt>WordPress Plugins</dt>
        <dd>
          WordPress Plugins add flexibility, features, and capabilities to your WordPress site.
          There are hundreds to choose from. Some add power and control like monitoring and busting
          comment spam and enhancing your administration features. Others add fun things like random
          elements and polling and rating systems.
        </dd>
      </dl>
      <p>
        And here is another paragraph to show the relationship between the various parts and pieces.
      </p>
      <h3>This is the H3 Heading</h3>
      <p>
        <img
          className="alignright"
          src="http://lorelle.files.wordpress.com/daisy1a.jpg"
          alt="Daisy, photograph Copyright Brent VanFossen"
        />
        If the H3 heading is your in-post section heading, then you need to see how it works within
        the post itself. If it isn’t, simply change the H3 to whatever heading number you are using.
      </p>
      <p>
        <img
          className="alignleft"
          src="http://lorelle.files.wordpress.com/daisy1a.jpg"
          alt="Daisy, photograph Copyright Brent VanFossen"
        />
        We need to look at how images, another major feature of most WordPress sites, are used
        within the site. Images tend to sit on the left, right, or middle of your post, depending
        upon how you are using them. For an image sitting on the left or right, you need to add
        appropriate padding around the image on the text side to push the text away from the image
        so the text won’t push up against the edges of the image.
      </p>
      <p>
        <img
          className="aligncenter"
          src="http://lorelle.files.wordpress.com/daisy1a.jpg"
          alt="Daisy, photograph Copyright Brent VanFossen"
        />
      </p>
      <p>
        A centered image is a little different. It is centered in the middle and the text is pushed
        above and below it.
      </p>
      <p>
        How to add the CSS styles for images is discussed in the Codex article,
        <a title="Using Images in WordPress" href="http://codex.wordpress.org/Using_Images">
          Using Images
        </a>
        .
      </p>
      <h3>Testing Font Looks - H3 Heading</h3>
      <p>
        You will need to test the looks of the different font styles, too.
        <strong>This is bold and THIS IS BOLD.</strong> <em>This is italic and THIS IS ITALIC.</em>
        <strong>
          <em>This is bold and italic and THIS IS BOLD AND ITALIC.</em>
        </strong>
        <code>This is code and THIS IS CODE.</code> And now let’s look at what the PRE tag, also
        known as the preformatted tag, looks like:
      </p>
      <pre>
        This is the pre tag. It should be formatted as written so if you add spaces to the front of
        the line it will show the spaces and the &lt;code&gt; as written
      </pre>
      <p>
        This should be back to the normal paragraph style and we hope you have been paying attention
        to the margins and padding around each element, including the paragraph, so you can position
        things appropriately to the rest of the content.
      </p>
      <h5>Your CSS Here - H5 Heading</h5>
      <p>
        Let’s look at the blockquote, one of the most common tags used in most blogs. It is designed
        to “frame” a quote from another blog, website, or reference that you are “quoting” from. For
        the most part, there are three examples of usage:
      </p>
      <blockquote>
        This is a simple quote. It is either preceded or followed by a link within the text to the
        credited source. A blockquote must be designed to stand out from the rest of the text
        content, but it does not have to “really” stand out, just separate itself from the content
        so we know it’s not your words.
      </blockquote>
      <p>
        A second style to the blockquote is one that includes a citation. Under HTML guidelines,
        this citation should be wrapped in the <code>&lt;cite&gt;</code> tag and then that tag can
        be styled to be in italics, bold, or whatever look you want in your design.
      </p>
      <p>
        Take care with the style of the <code>&lt;cite&gt;</code> tag as some WordPress Themes use
        it in the comments area. I recommend you style it specifically with
        <code>blockquote cite </code> in your stylesheet.
      </p>
      <blockquote>
        This is an example of a blockquote which also contains a link to
        <a
          title="Blog Design and Layout Tips on the WordPress Codex"
          href="http://codex.wordpress.org/Blog_Design_and_Layout"
        >
          Blog Design and Layout
        </a>
        articles on the
        <a
          title="WordPress Codex - online manual for WordPress Users"
          href="http://codex.wordpress.org/"
          rel="tag"
        >
          WordPress Codex
        </a>
        , the online manual for WordPress Users, to help you see what links will look link within a
        blockquote.
        <cite>
          <a title="Lorelle on WordPress" href="http://lorelle.wordpress.com/">
            Lorelle on WordPress
          </a>
          , your guide to all things WordPress and blogging
        </cite>
      </blockquote>
      <p>
        The citation includes a link and text to help you see what a link and text will look like
        within the cite tag.
      </p>
      <p>
        There are many tags that can be found within a blockquote, just as can be found within any
        container within your web page design, but a last example includes an unordered list. Many
        bloggers love to quote examples from lists, so this is a good tag series to test.
      </p>
      <blockquote>
        Within this web design sandbox test page, we’ve tested:
        <ul>
          <li>Headings</li>
          <li>Text styles like bold and italic</li>
          <li>Ordered (numbered) and unordered (bullets) lists</li>
          <li>Links</li>
          <li>Code and PRE tags</li>
          <li>Blockquotes</li>
          <li>And much more…</li>
        </ul>
        Which should show you what a list looks like within a blockquote.
      </blockquote>
      <p>
        Each website is unique with it’s own look and feel for the various parts and pieces. This
        cut and paste section looks only at what you might have within your content section. So if
        you will have boxes for lists or little aside information, you will need to add them so you
        can see how they will look in the overall page layout.
      </p>
      <p>
        Some elements in a
        <a title="WordPress Themes" href="http://codex.wordpress.org/Using_Themes">
          WordPress Theme
        </a>
        are controlled by the style sheet, while others are controlled by the Template files. Try to
        work on as much as you can from the style sheet first, then you can mess with the template
        files.
      </p>
      <p>
        Remember, any changes you make to the style sheet and template files will be not available
        if you change themes. If you want them carried over, you will need to copy and paste them
        into the new Theme folder.
      </p>
      <p>
        As a last element in the content area and throughout your site, check the hypertext links.
        These are the links to external websites and/or internal pages within your site. They come
        in three flavors: active, visited, and hover. Make sure you work on the styles for each of
        these.
      </p>
      <h1>Typography test page with a very long H1 element so that we can test line height</h1>
      <p>
        This page demonstrates the various typographic styles that are available within WordPress
        editor fields. As you can probably see, this is a basic paragraph of text. Within it you can
        include hyperlinks to other pages. When doing so, the link text should always be descriptive
        of the page that you are linking to. For example, visit the‚
        <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
          Google homepage
        </a>
        is a much better way of linking than this; to visit the Google homepage,
        <a href="http://www.google.com" rel="noopener noreferrer" target="_blank">
          click here
        </a>
        . When creating hyperlinks it’s best practice to open links to external websites (offsite
        links) in a new window/tab thus allowing the user to still have this website open in their
        browser when they have finished with the external website.
      </p>
      <p>Some more text here.</p>
      <h2>Heading 2 – Similarly, this will probably push to two lines as well</h2>
      <p>
        Headings are used to separate blocks of text by level of importance. By default a page title
        in WordPress is always set in Heading 1 because it is the most important heading on the
        page. A page’s H1 is an important factor for ‘on page’ SEO. You can see that this paragraph
        is prefaced with a Heading 2 – the second level of heading importance.
      </p>
      <p>Now let’s add a horizontal line below this paragraph to check that they are working.</p>
      <hr />
      <p>
        Gosh, we’re at a level 4 Heading already. That means that this paragraph should only contain
        text that is supportive of the main content as opposed to being of high significance to it.
      </p>
    </>
  );
}
