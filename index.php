<?php get_header(); ?>

<!-- CONTENT -->

<main id="main">
    <div class="container">
        <div class="row">
            <div class="col-12">
                <h1>Front-end-Boilerplate</h1>
                <h2 x-data="{ message: 'I ❤️ Alpine' }" x-text="message"></h2>
                <p>Developed by Murillo Camargo <a href="mailto:murillo@murillocamargo.com.br">murillo@murillocamargo.com.br</a></p>
                <p><a class="btn btn-primary btn-lg" href="http://www.murillocamargo.com.br" target="_blank" role="button">Visit my website</a></p>
            </div>
        </div>
    </div>
</main>
<!-- /#main -->

<?php get_footer(); ?>
