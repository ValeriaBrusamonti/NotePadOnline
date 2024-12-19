<?php require('db.php');

    $rows = notes_select();
    include('_template_header.php'); ?>

<?php 
    foreach ($rows as $row)
    {
    ?>
        <div class="blocco" id="bloccouno">
            <div class="bloccoimg">
                    <div id="uno">
                    </div></div>
                <div class="bloccotxt">
                    <p><?=$row['contenuto']?></p>
                </div>
            </div>
<?php
    }
?>
            <div class="blocco"  id="bloccodue">
                <div class="bloccoimg">
                <div id="due">
                </div></div>
                <div class="bloccotxt">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum quo harum laboriosam ducimus expedita velit accusamus sit eligendi ratione eius dicta, eum itaque tempore. Rem neque repellendus laboriosam qui laborum.</p>
                </div>
            </div>
            <div class="blocco" id="bloccotre">
                <div class="bloccoimg">
                    <div id="tre">
                    </div></div>
                <div class="bloccotxt">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum quo harum laboriosam ducimus expedita velit accusamus sit eligendi ratione eius dicta, eum itaque tempore. Rem neque repellendus laboriosam qui laborum.</p>
                </div>
            </div>
<?php include('_template_footer.php'); ?>